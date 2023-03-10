import React, { useEffect, useContext } from 'react';
import ErrorImage from '../../images/Error.svg';
import { useDispatch } from 'react-redux';
import { hideError } from '../../redux/screens';
import { HeaderContext } from '../Header/HeaderContextProvider';
import { resetVoucherErrors } from '../../redux/voucher';
import './index.css';

const errorMessageTitle = 'УПС';
const somethisngWrongMessage = 'что-то пошло не так';

const Error: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(function() {
      dispatch(resetVoucherErrors());
      dispatch(hideError());
    }, Number(process.env.REACT_APP_REQUEST_ERROR_TIMEOUT))
  });

  return(
    <>
      <div className="error-page-wrapper">
        <div className="page-container-error">
          <div className="popup-message-error">{errorMessageTitle}</div>
          <div className="image-error">
            <img src={ErrorImage} alt=""/>
          </div>
          <div className="text-error">{somethisngWrongMessage}</div>
        </div>
      </div>
    </>
  )
}

export default Error;