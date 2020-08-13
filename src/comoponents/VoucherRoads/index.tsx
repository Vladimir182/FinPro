import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux';
import VoucherLogin from '../VoucherLogin';
import VoucherPin from '../VoucherPin';
import { Redirect } from 'react-router';

const VoucherRoads: React.FC = () => {
  const { login, pincode, isVoucherVerified, isPincodeVerified } = useSelector((state: AppState) => state.voucher);
  
  if (isVoucherVerified && isPincodeVerified) {
    // return <VoucherInterface />
    return <p>TEST</p>
  } else if (isVoucherVerified) {
    return <VoucherPin />
  } else {
    return <VoucherLogin /> 
  }
}

export default VoucherRoads;