import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import VoucherLogin from '../VoucherLogin';
import VoucherPin from '../VoucherPin';
import { HeaderButtonContext } from '../Header/HeaderButtonProvider';

const HomeScreen: React.FC = () => {
  // const { setLink } = useContext(HeaderButtonContext);

  // useEffect(() => {
  //   setLink('');
  // })

  return (
    <>
      <p>Home Screen</p>

      <NavLink to="/voucher" >Новый ваучер</NavLink>
      <NavLink to="/voucher" >Войти с ваучером</NavLink>
    </>
  )
}

export default HomeScreen;