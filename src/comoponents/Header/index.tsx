import React, { useContext, useEffect } from 'react';
import logo from '../../images/logo.svg';
import { HeaderContext } from './HeaderContextProvider';
import './index.css';

const rootStyles = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
} as React.CSSProperties;

const Header: React.FC = () => {
  let {
    hideLogo,  
    setHideLogo,
  } = useContext(HeaderContext);

  useEffect(() => {
    if (hideLogo) {
      setHideLogo(false);
    }
  })

  return (
    <div className="header" style={rootStyles}>
      { hideLogo 
        ? <div><span style={{ visibility: 'hidden' }}> hidden</span></div>
        : <img src={logo} className="logoStyle" />
      }
    </div>
  )
}

export default Header;