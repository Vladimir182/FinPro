import Base from './Base';
import { Body } from './types';
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
}

export default Voucher;
