import React, {useContext, useEffect} from 'react';
import newVoucher from '../../images/icon_new_voucher.svg';
import existingVoucher from '../../images/icon_voucher.svg';
import BaseButton from '../Buttons/BaseButton';
import './index.css';
import {NavLink, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import VoucherLogin from '../VoucherLogin';
import VoucherPin from '../VoucherPin';
import {HeaderButtonContext} from '../Header/HeaderButtonProvider';
import './index.module.css';
import {AppState} from '../../redux';
import PrintCheck from '../Checks';
import {fetchPrintVoucher} from "../../redux/voucher";

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, voucherSessionKey } = useSelector((state: AppState) => state.voucher)
  // const { setLink } = useContext(HeaderButtonContext);
  // useEffect(() => {
  //   setLink('');
  // })
  const handlePrintVoucher = () =>{
    fetchPrintVoucher()(dispatch);
  };

  const buttonStyles = {};

  if (isLoading) {
    return <PrintCheck />;
  }

  return (
    <>
      {voucherSessionKey && <Redirect to="/voucher" /> }
      <div className="home-container">
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
    </>
  )
}

export default HomeScreen;