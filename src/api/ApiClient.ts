import queryString from 'query-string';
import Axios from 'axios';
import { store } from '../App';
import { fetchRefreshToken } from '../redux/authorization';
import { fetchServerConnection } from '../redux/error-screen';

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

	handleResponse = (res: any) => {
		return res
			.then((res: any) => {
				return res;
			})
			.catch((error: any) => {
				const response = error.response;
				const accessToken = localStorage.getItem('finpro_access_token');

				if (accessToken && response.status === 401) {
					fetchRefreshToken()(store.dispatch);

					return;
				}

				throw response;
			});
  }
    
	request: Request = async ({ url, method, params = {}, body }) => {
    const token = localStorage.getItem('finpro_access_token');

		let query = Object.keys(params).length
			? `?${queryString.stringify(params)}`
      : '';

    query += token ? `?accessToken=${token}` : '';

		const res = Axios({
			// baseURL: process.env.REACT_APP_API_URL,
			method: 'POST',
			url: `${process.env.REACT_APP_URL}/${this.prefix}${url}${query}`,
			data: method !== 'GET' ? body : null,
			withCredentials: true,
		});

		return this.handleResponse(res);
	}
}

setInterval(function() {
	store.dispatch(fetchServerConnection());
}, 5000)