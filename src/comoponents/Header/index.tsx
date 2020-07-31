import React, { useContext } from 'react';
import logo from '../../images/logo.svg';
import { HeaderButtonContext } from './HeaderButtonProvider';
import { NavLink } from 'react-router-dom';
import './index.scss';

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
    height: '150pt',
    padding: '70px 0',
    
    // background: theme.background,
  }

  return (
    <div style={rootStyles}>
      <div>
        <span style={{ visibility: 'hidden' }}>hiddenn</span>
        { link && <NavLink to={link} onClick={handleButtonClick}>Back button</NavLink> }
      </div>
      <img src={logo} />
      <div>
        <span style={{ visibility: 'hidden' }}> hidden</span>
      </div>
    </div>
  )
}

export default Header;