import ApiClient from './ApiClient';
import AuthApi from './Auth';
import VoucherApi from './Voucher';

export default (function({ apiPrefix }: any = {}) {
	// if (!apiPrefix) {
	// 	throw new Error('[apiPrefix] required');
	// }

	const apiClient = new ApiClient({ prefix: 'cashpro/voucher' });
  const authClient = new ApiClient({ prefix: 'oauth2' });
  
	return {
		apiClient,
		auth: new AuthApi({ apiClient: authClient }),
		voucher: new VoucherApi({ apiClient }),
	};
})();
