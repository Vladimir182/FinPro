import React, {useContext, useEffect} from 'react';
import newVoucher from '../../images/icon_new_voucher.svg';
import existingVoucher from '../../images/icon_voucher.svg';
import BaseButton from '../Buttons/BaseButton';
import './index.css';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import VoucherLogin from '../VoucherLogin';
import VoucherPin from '../VoucherPin';
import {HeaderButtonContext} from '../Header/HeaderButtonProvider';
import './index.module.css';
import {AppState} from '../../redux';
import Check from '../Checks/index';
import {fetchPrintVoucher} from "../../redux/voucher";

const HomeScreen: React.FC = () => {
  // const { setLink } = useContext(HeaderButtonContext);
  const dispatch = useDispatch();

  const handlePrintVoucher = () =>{
    fetchPrintVoucher()(dispatch);
  };


  // useEffect(() => {
  //   setLink('');
  // })

  const buttonStyles = {};
  return (
    <div className="home-container">
      <BaseButton
        className="home-screen-button"
        title="Новый ваучер"
        onClick={handlePrintVoucher}
        link="/voucher-create"
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
  )
}

export default HomeScreen;