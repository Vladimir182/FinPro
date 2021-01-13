import queryString from 'query-string';
import Axios from 'axios';
import { store } from '../App';
import { fetchRefreshToken, logOut } from '../redux/authorization';
import { fetchServerConnection } from '../redux/screens';
import { closeVoucherSession } from '../redux/voucher';

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestParams = {
  url: string;
  method: RequestMethods;
  params?: { [x: string]: any };
  body?: { [x: string]: any };
};

type Request = (params: RequestParams) => void;

type Query = (url: string, params: { [x: string]: any }) => void;

export default class ApiClient {
  prefix: string;
  token: string;

	constructor({ prefix = 'cashpro/voucher/' } = {}) {
		this.prefix = prefix;
		this.token = '';
	}

	get: Query = async (url, params) => {
		return this.request({
			url,
			params,
			method: 'GET'
		});
	}

	post: Query = async (url, payload = {}) => {
		return this.request({
			url,
			method: 'POST',
			body: payload
		});
	}

	put: Query = async (url, payload = {}) => {
		return this.request({
			url,
			method: 'PUT',
			body: payload
		});
	}

	patch: Query = async (url, payload = {}) => {
		return this.request({
			url,
			method: 'PATCH',
			body: payload
		});
	}

	delete: Query = async (url, payload = {}) => {
		return this.request({
			url,
			method: 'DELETE',
			body: payload
		});
	}

	handleResponse = (res: any, url?: any) => {
		return res
			.then((res: any) => {
				const messageError = res?.data?.message_error;

				if (
					(messageError && (
						messageError === "Voucher not found!" 
						|| messageError === 'Printer not responding' 
						|| messageError === 'Ваучер не найден.' 
						|| messageError === false)
					) && url !== '/find-voucher'
				) {
					store.dispatch(closeVoucherSession());

					throw {};
				}

				return res;
			})
			.catch((error: any) => {
				if (!error.response) {
					throw error;
				}

				const state = store.getState();
				const response = error.response;
				const refreshToken = localStorage.getItem('finpro_refresh_token');

				if (refreshToken && (response && response.status === 401)) {
					fetchRefreshToken()(store.dispatch);

					return;
				} else if (!refreshToken && response.status === 401 && state.authorization.isAuth) {
					logOut()(store.dispatch);
				}

				if (response) {
					throw response;
				}
			});
  }
    
	request: Request = async ({ url, method, params = {}, body }) => {
    	const token = localStorage.getItem('finpro_access_token');

		params['accessToken'] = token;

		let query = Object.keys(params).length
			? `?${queryString.stringify(params)}`
      		: '';

	    // query += token ? `?accessToken=${token}` : '';

		const res = Axios({
			// ${process.env.REACT_APP_URL_DEV}  - ADD THIS BEFORE PUSH TO REMOTE OR REMOVE FROM URL TO RUN LOCALY.
			method: 'POST',
			url: `${process.env.REACT_APP_URL_DEV}/${this.prefix}${url}${query}`,
			data: method !== 'GET' ? body : null,
			withCredentials: true,
			timeout: 90000
		});

		return this.handleResponse(res, url);
	}
}
 
setInterval(function() {
	store.dispatch(fetchServerConnection());
}, 5000)