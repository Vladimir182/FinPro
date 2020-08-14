import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux";
import Check from "../Checks";
import {Redirect} from "react-router";
import Error from '../Error';

const VoucherCreate: React.FC = () => {
  const dispatch = useDispatch();

  let isCreateLoading = useSelector((state: AppState) => state.voucher.isCreateLoading);
  let voucherSessionKey  = useSelector((state: AppState) => state.voucher.voucherSessionKey);
  let isError = useSelector((state: AppState) => state.voucher.isError);

  isCreateLoading = true;
  isError = true;

  if (isCreateLoading) {
    return <Check />
  }
  useEffect(() => {
    // setLink('/');
  })


  if (!isCreateLoading && voucherSessionKey) {
    return <Redirect to="/voucher" />
  }
  if (isError) {
    return <Error />
  }
  return <Check />
}

export default VoucherCreate;