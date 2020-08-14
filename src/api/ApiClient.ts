import queryString from 'query-string';
import Axios from 'axios';
import { store } from '../App';

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestParams = {
  url: string;
  method: RequestMethods;
  params?: { [x: string]: any }; 
  body?: { [x: string]: any };
};

type Requset = (params: RequestParams) => void;

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
				
				throw response;
			});
  }
    
	request: Requset = async ({ url, method, params = {}, body }) => {
    const token = localStorage.getItem('finpro_access_token');

		let query = Object.keys(params).length
			? `?${queryString.stringify(params)}`
      : '';

    query += token ? `?accessToken=${token}` : '';

		const res = Axios({
			// baseURL: process.env.REACT_APP_API_URL,
      method: 'POST',
      // ${process.env.REACT_APP_URL}/
      url: `${this.prefix}${url}${query}`,
      data: method !== 'GET' ? body : null,
      withCredentials: true,
		});

		return this.handleResponse(res);
	}
}

// https://kiosk-api.kiosk-frontend.finpro.pw/cashpro/voucher/print-voucher?accessToken=ef9cfcb1ed421fda6cc9338e40e853d591a84b0d