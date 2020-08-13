import React, {useContext, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import { useSelector } from "react-redux";
import VoucherLogin from '../VoucherLogin';
import VoucherPin from '../VoucherPin';
import {HeaderButtonContext} from '../Header/HeaderButtonProvider';

import newVoucher from '../../images/icon_new_voucher.svg'
import existingVoucher from '../../images/icon_voucher.svg'
import './index.module.css';
import { AppState } from '../../redux';
import Check from '../Checks/index';

const HomeScreen: React.FC = () => {
  // const { setLink } = useContext(HeaderButtonContext);

  return (
    <>
      <div className="home-page-wrapper">
        <div className="home-container">
            <div className="button-left block">
              <div className="wrapper">
              <NavLink to="/voucher-create">
                <img src={newVoucher} alt="image"/>
                <p>Новый ваучер</p>
              </NavLink>
            </div>
          </div>


          <div className="button-right block">
            <div className="wrapper">
              <NavLink to="/voucher">
                <img src={existingVoucher} alt="image"/>
                <p>Войти с ваучером</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeScreen;