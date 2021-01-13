import React, { useEffect, Suspense, lazy, useContext} from 'react';
import newVoucher from '../../images/icon_new_voucher.svg';
import existingVoucher from '../../images/icon_voucher.svg';
import BaseButton from '../Buttons/BaseButton';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from '../../redux';
import PrintCheck from '../Checks';
import {fetchPrintVoucher, resetVoucherErrors} from "../../redux/voucher";
import {resetWsToken} from '../../redux/authorization';
import './index.module.css';
import './index.css';
import { CentrifugeContext } from '../../CentrifugeProvider';
// const BaseButton = React.lazy(() => import('../Buttons/BaseButton'));

const HomeScreen: React.FC = () => {
  const centrifuge = useContext(CentrifugeContext)
  const dispatch = useDispatch();
  const { 
    isPrintLoading,
    voucherSessionKey,
    isError,
    errorMessage
   } = useSelector((state: AppState) => state.voucher);
  const { wssToken } = useSelector((state: AppState) => state.authorization)
  
  useEffect(() => {
    if (isError || errorMessage) {
      dispatch(resetVoucherErrors());
    }
    if (centrifuge) {
      centrifuge.disconnect();
    }
    if (wssToken) {
      dispatch(resetWsToken());
    }
  }, [isError, errorMessage, voucherSessionKey]);

  const handlePrintVoucher = () =>{
    fetchPrintVoucher()(dispatch);
  };

  return (
    <>
      {voucherSessionKey && <Redirect to="/voucher" /> }
      { isPrintLoading
        ? <PrintCheck />
        : <div className="home-container">
          <BaseButton
            className="home-screen-button"
            title="Новый ваучер"
            onClick={handlePrintVoucher}
            image={newVoucher}
          />
          <BaseButton
            className="home-screen-button"
            title="Войти с ваучером"
            link="/voucher-login"
            image={existingVoucher}
            style={{ marginRight: '0' }}
          />
        </div>
      }
    </>
  )
}

export default React.memo(HomeScreen);