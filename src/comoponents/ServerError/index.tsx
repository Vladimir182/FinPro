import React from 'react';

import './index.css'
import serverError from '../../images/serverError.svg'


const ServerError: React.FC = () => {
  return (
    <>
      <div className="serverError-page-wrapper">
          <div className="serverError-container-page">
            <div className="error-message">
              <span>ошибка связи с сервером</span>
            </div>
            <div className="serverError-wrapper">
              <div className="serverError-image">
                <img src={serverError} alt=""/>
              </div>
              <div className="error-info">
                <div className="terminal-number"><span>Терминал № &nbsp;</span> 12345678</div>
                <div className="terminal-phone">+12 345 678 90 00</div>
                <div className="terminal-email">email@support.sup</div>
                <div className="terminal-contact"><span>обратитесь к администратору</span></div>
              </div>
            </div>
          </div>
      </div>
    </>
  )
} 

export default ServerError;