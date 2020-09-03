import React, {useContext, useEffect, Suspense, lazy} from 'react';
import newVoucher from '../../images/icon_new_voucher.svg';
import existingVoucher from '../../images/icon_voucher.svg';
import BaseButton from '../Buttons/BaseButton';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {HeaderContext} from '../Header/HeaderContextProvider';
import {AppState} from '../../redux';
import PrintCheck from '../Checks';
import {fetchPrintVoucher, resetVoucehrErrors} from "../../redux/voucher";
import './index.module.css';
import './index.css';
// const BaseButton = React.lazy(() => import('../Buttons/BaseButton'));

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { 
    isPrintLoading,
    voucherSessionKey,
    isError,
    errorMessage
   } = useSelector((state: AppState) => state.voucher);
  const { setLink, setStopVoucherSession } = useContext(HeaderContext);
  
  useEffect(() => {
    setLink('');
    setStopVoucherSession(false);
    if (isError || errorMessage) {
      dispatch(resetVoucehrErrors());
    }
  }, [isError, errorMessage, voucherSessionKey]);
  
  const handlePrintVoucher = () =>{
    fetchPrintVoucher()(dispatch);
  };

  const buttonStyles = {};
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
            style={buttonStyles}
          />
          <BaseButton
            className="home-screen-button"
            title="Войти с ваучером"
            link="/voucher-login"
            image={existingVoucher}
            style={{...buttonStyles, marginRight: '0'}}/>
        </div>
      }
    </>
  )
}

export default React.memo(HomeScreen);