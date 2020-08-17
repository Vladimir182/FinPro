import React, { useContext, useState, useEffect } from 'react';
import logo from '../../images/logo.svg';
import { HeaderContext } from './HeaderContextProvider';
import { NavLink } from 'react-router-dom';
import { fetchCloseVoucherSession } from '../../redux/voucher';
import './Header.module.css';
import './index.css';
import Arrow from '../../images/ArrowLeft.svg'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux';

const Header: React.FC = () => {
  const dispatch = useDispatch(); 
  let { link, setLink, stopVoucherSession, setStopVoucherSession, hideLogo,  setHideLogo } = useContext(HeaderContext);
  const { voucherSessionKey } = useSelector((state: AppState) => state.voucher);
  link = !link ? (sessionStorage.getItem('finpro-backlink') ?? '') : link;

  const handleButtonClick = () => {
    sessionStorage.removeItem('finpro-backlink');
    
    if (stopVoucherSession && voucherSessionKey) {
      fetchCloseVoucherSession(voucherSessionKey)(dispatch);
      setStopVoucherSession(false);
    }

    setLink('');
  }

  useEffect(() => {
    if (hideLogo) {
      setHideLogo(false);
    }
  })

  const rootStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  } as React.CSSProperties;

  const backButton = {
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(180deg, #56007D 0%, #9100D2 52.08%, #8A00C9 98.96%, #61018C 100%)',
    borderRadius: '14px',
    display: 'flex',
    fontStyle: 'normal',
    left: '5px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    fontWeight: 'bolder',
  } as React.CSSProperties;

  const layer = {
    justifyContent: "center",
    justifyItems: "center",
    background: 'linear-gradient(180deg, #40005D 0%, #7400A8 100%)',
    borderRadius: '20px',
    display: "flex",
    position: 'absolute',
  } as React.CSSProperties;

  return (
    <div className="header" style={rootStyles}>
      <div>
        <span style={{ visibility: 'hidden' }}>hiddenn</span>
        { (link || stopVoucherSession) && <div style={layer} className='layer'>
	        <NavLink to={link} style={backButton} className='backButton' onClick={handleButtonClick}>
		        <img src={Arrow} alt=""/>
		        Назад</NavLink>
        </div> }
      </div>
      { hideLogo 
        ? <div><span style={{ visibility: 'hidden' }}> hidden</span></div>
        : <img src={logo} className="logoStyle" />
      }
      <div>
        <span style={{ visibility: 'hidden' }}> hidden</span>
      </div>
    </div>
  )
}

export default Header;