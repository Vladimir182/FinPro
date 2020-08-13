import React, { useEffect } from 'react';
import {useSelector} from "react-redux";
import {AppState} from "../../redux";
import Check from "../Checks";
import {Redirect} from "react-router";
import Error from "../Error/Error";

const VoucherCreate: React.FC = () => {
  let isCreateLoading = useSelector((state: AppState) => state.voucher.isCreateLoading);
  let sessionKey  = useSelector((state: AppState) => state.voucher.sessionKey);
  let isError = useSelector((state: AppState) => state.voucher.isError);

  isCreateLoading = true;
  sessionKey = 'sadasdasd';
  isError = true;

  useEffect(() => {
    // setLink('/');

  })


  if (!isCreateLoading && sessionKey) {
    return <Redirect to="/voucher" />
  }
  if (isError) {
    return <Error/>
  }
  return <Check />
}

export default VoucherCreate;