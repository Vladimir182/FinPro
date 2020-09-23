import React, { useContext } from 'react';
import serverError from '../../images/serverError.svg'
import Header from '../Header';
import { ThemeContext } from '../../ThemeContextProvider';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux';
import './index.css';

const errorServerTitle = 'ошибка связи с сервером';
const termialNumText = 'Терминал №';
const noTerminalInfoText = 'Нет данных о терминале';
const conclusionText = 'обратитесь к администратору';

const ServerError: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { terminalId } = useSelector((state: AppState) => state.voucher);

  const rootStyles = { 
    background: theme.background,
    color: theme.color,
    height: '100%',
    padding: '0 4%'
  };

  const contentStyles = {
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <div className="main-page-root" style={rootStyles}>
      <Header />
      <div className="content" style={contentStyles}>
        <div className="serverError-page-wrapper">
            <div className="serverError-container-page">
              <div className="error-message">
                <span>{errorServerTitle}</span>
              </div>
              <div className="serverError-wrapper">
                <div className="serverError-image">
                  <img src={serverError} alt=""/>
                </div>
                <div className="error-info">
                  <div className="terminal-number"><span>{termialNumText} &nbsp;</span>{ terminalId ?? noTerminalInfoText }</div>
                  {/* <div className="terminal-phone">+12 345 678 90 00</div>
                  <div className="terminal-email">email@support.sup</div> */}
                  <div className="terminal-contact"><span>{conclusionText}</span></div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
} 

export default ServerError;