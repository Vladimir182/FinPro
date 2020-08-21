import Base from './Base';
import { Body, WithdrawBody, PinBody } from './types';
const path = '';

class Voucher extends Base {
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
}

export default Voucher;
