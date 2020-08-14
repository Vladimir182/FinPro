import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState } from '../../redux';
import { HeaderButtonContext } from '../Header/HeaderButtonProvider';
// import VoucherLogin from '../VoucherLogin';
// import VoucherPin from '../VoucherPin';

const VoucherRoads: React.FC = () => {
<<<<<<< HEAD
  const voucherSessionKey = useSelector((state: AppState) => state.voucher.voucherSessionKey);
=======
  const { voucherSessionKey } = useSelector((state: AppState) => state.voucher);
>>>>>>> voucher-authorization-tmp
  const { setLink } = useContext(HeaderButtonContext);
  
  useEffect(() => {
    setLink('/');
  })
  
  return (
    <>
      { !voucherSessionKey && <Redirect to="/voucher-login" /> }
      <p>Voucher interface</p>
    </>
  )
}

export default VoucherRoads;