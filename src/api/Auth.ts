import Base from './Base';
import { Body } from './types';
const path = '';

class Auth extends Base {
	token(body: Body) {
		return this.apiClient.post(`/token`, body);
	}

	logout(body: Body) {
		return this.apiClient.post(`/logout`);
	}

	checkAuth() {
		return this.apiClient.get(`${path}`);
	}
}

export default Auth;
