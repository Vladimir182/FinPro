import React, { useContext } from 'react';
import logo from '../../images/logo.svg';
import { HeaderButtonContext } from './HeaderButtonProvider';
import { NavLink } from 'react-router-dom';

import './Header.module.css';
import Arrow from '../../images/ArrowLeft.svg'

const Header: React.FC = () => {
  let { link, setLink } = useContext(HeaderButtonContext);

  link = !link ? (sessionStorage.getItem('pinpro-backlink') ?? '') : link;

  const handleButtonClick = () => {
    sessionStorage.removeItem('pinpro-backlink');
    setLink('');
  }

  const rootStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '180pt',
    padding: '76px 0',
    
    // background: theme.background,
  }
  const backButton = {
    alignItems: 'center',
    background: 'linear-gradient(180deg, #56007D 0%, #9100D2 52.08%, #8A00C9 98.96%, #61018C 100%)',
    borderRadius: '14px',
    display: 'flex',
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: '36px',
    justifyContent: 'space-between',
    height: '115px',
    left: '5px',
    top: '8px',
    letterSpacing: '0.05em',
    padding: '36px 30px',
    position: 'absolute',
    // top: '3px',
    textTransform: 'uppercase',
    width: '249px'
  } as React.CSSProperties;

  const layer = {
    alignContent: "center",
    background: 'linear-gradient(180deg, #40005D 0%, #7400A8 100%)',
    borderRadius: '20px',
    display: "flex",
    justifyContent: "center",
    height: '131px',
    position: 'absolute',
    top: '55px',
    width: '260px',
  } as React.CSSProperties;

  return (
    <div style={rootStyles}>
      <div>
        <span style={{ visibility: 'hidden' }}>hiddenn</span>
        { link && <div style={layer} className='layer'>
	        <NavLink to={link} style={backButton} className='backButton' onClick={handleButtonClick}>
		        <img src={Arrow} alt=""/>
		        Назад</NavLink>
        </div> }
      </div>
      <img src={logo} className="logoStyle"/>
      <div>
        <span style={{ visibility: 'hidden' }}> hidden</span>
      </div>
    </div>
  )
}

export default Header;