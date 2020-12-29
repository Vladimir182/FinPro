import Base from './Base';
import { Body, WithdrawBody, PinBody } from './types';
const path = '';

class Voucher extends Base {
	wssToken() {
		return this.apiClient.get('/socket-token');
	}

	find(body: Body) {
		return this.apiClient.post(`/find-voucher`, body);
	}

	printVoucher() {
		return this.apiClient.get('/print-voucher');
	}

	closeSession(body: Body) {
		return this.apiClient.post('/close', body);
	}

	withdraw(body: WithdrawBody) {
		return this.apiClient.post('/withdraw', body);
	}

	cassetteInfo(body: Body) {
		return this.apiClient.post('/cassete-info', body);
	}

	pin(body: PinBody) {
		return this.apiClient.post('/withdraw-pin', body);
	}

	deposit(body: Body) {
		return this.apiClient.post('/deposit', body);
	}

	printCheck(body: Body) {
		return this.apiClient.post('/print-check', body);
	}

	showBalance(body: Body) {
		return this.apiClient.post('/show-balance', body);
	}

	terminal() {
		return this.apiClient.post('/terminal');
	}

	ping() {
		return this.apiClient.post('/ping');
	}
}

export default Voucher;
