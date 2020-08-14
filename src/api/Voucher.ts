import Base from './Base';
import { Body } from './types';
const path = '';

class Voucher extends Base {
	find(body: Body) {
		return this.apiClient.post(`/find-voucher`, body);
	}
  printVoucher() {
	  return this.apiClient.get(`/print-voucher`);
  }
	// logout(body: Body) {
	// 	return this.apiClient.post(`/logout`);
	// }

	// checkAuth() {
	// 	return this.apiClient.get(`${path}`);
	// }
}

export default Voucher;
