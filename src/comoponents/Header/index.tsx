import React, { useContext } from 'react';
import logo from '../../images/logo.svg';
import { HeaderButtonContext } from './HeaderButtonProvider';
import { NavLink } from 'react-router-dom';

import './Header.module.css';
import './index.css';
import Arrow from '../../images/ArrowLeft.svg'

const Header: React.FC = () => {
  let { link, setLink } = useContext(HeaderButtonContext);

  link = !link ? (sessionStorage.getItem('finpro-backlink') ?? '') : link;

  const handleButtonClick = () => {
    sessionStorage.removeItem('finpro-backlink');
    setLink('');
  }

  const rootStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  }
  const backButton = {
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(180deg, #56007D 0%, #9100D2 52.08%, #8A00C9 98.96%, #61018C 100%)',
    borderRadius: '14px',
    display: 'flex',
    fontStyle: 'normal',
    // justifyContent: 'space-between',
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
        { link && <div style={layer} className='layer'>
	        <NavLink to={link} style={backButton} className='backButton' onClick={handleButtonClick}>
		        <img src={Arrow} alt=""/>
		        Назад</NavLink>
        </div> }
      </div>
      <img src={logo} className="logoStyle" />
      <div>
        <span style={{ visibility: 'hidden' }}> hidden</span>
      </div>
    </div>
  )
}

export default Header;