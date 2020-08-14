import Base from './Base';
import { Body } from './types';
const path = '';

class Voucher extends Base {
	find(body: Body) {
		return this.apiClient.post(`/find-voucher`, body);
	}
<<<<<<< HEAD
  printVoucher() {
	  return this.apiClient.get(`/print-voucher`);
  }
	// logout(body: Body) {
	// 	return this.apiClient.post(`/logout`);
	// }
=======

	printVoucher() {
		return this.apiClient.get('/print-voucher');
	}
>>>>>>> voucher-authorization-tmp

	closeSession(body: Body) {
		return this.apiClient.post('/close', body);
	}
}

export default Voucher;
