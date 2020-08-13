import React from 'react';
import { useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { AppState } from '../../redux';

const VoucherPin: React.FC = () => {
  // const isVoucherVerified = useSelector((state: AppState) => state.voucher.isVoucherVerified);

  return (
    <>
      {/* { !isVoucherVerified && <Redirect to="/voucher-login" /> } */}
      <p>Voucher pin</p>
    </>
  )
}

export default VoucherPin;