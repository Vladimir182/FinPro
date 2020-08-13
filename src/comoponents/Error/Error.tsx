import React from 'react';

import './error.module.css';
import ErrorImage from '../../images/Error.svg'

const Error: React.FC = () => {
  return(
    <>
      <div className="error-page-wrapper">
        <div className="page-container-error">
          <div className="popup-message-error">УПС</div>
          <div className="image-error">
            <img src={ErrorImage} alt=""/>
          </div>
          <div className="text-error">что-то пошло не так</div>
        </div>
      </div>
    </>
  )
}

export default Error;