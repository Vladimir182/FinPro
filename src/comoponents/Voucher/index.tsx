import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState } from '../../redux';
import { HeaderButtonContext } from '../Header/HeaderButtonProvider';
// import VoucherLogin from '../VoucherLogin';
// import VoucherPin from '../VoucherPin';

const VoucherRoads: React.FC = () => {
  const voucherSessionKey = useSelector((state: AppState) => state.voucher.voucherSessionKey);
  const { setLink } = useContext(HeaderButtonContext);
  
  setLink('/');
  
  return (
    <>
      { !voucherSessionKey && <Redirect to="/voucher-login" /> }
      <p>Voucher interface</p>
    </>
  )
}

export default VoucherRoads;