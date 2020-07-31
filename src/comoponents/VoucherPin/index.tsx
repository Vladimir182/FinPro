import React from 'react';
import { useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { AppState } from '../../redux';

const VoucherPin: React.FC = () => {
  const isLoginVerified = useSelector((state: AppState) => state.voucher.isLoginVerified);
  
  return (
    <>
      {/* { !isLoginVerified && <Redirect to="/voucher-login" /> } */}
      <p>Voucher pin</p>
    </>
  )
}

export default VoucherPin;