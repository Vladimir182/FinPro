import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux';
import VoucherLogin from '../VoucherLogin';
import VoucherPin from '../VoucherPin';
import { Redirect } from 'react-router';

const VoucherRoads: React.FC = () => {
  const { login, pincode, isLoginVerified, isPincodeVerified } = useSelector((state: AppState) => state.voucher);
  
  if (isLoginVerified && isPincodeVerified) {
    // return <VoucherInterface />
    return <p>TEST</p>
  } else if (isLoginVerified) {
    return <VoucherPin />
  } else {
    return <VoucherLogin /> 
  }
}

export default VoucherRoads;