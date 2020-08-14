import React, { useEffect, useContext } from 'react';
import ErrorImage from '../../images/Error.svg';
import { useDispatch } from 'react-redux';
import { hideError } from '../../redux/error-screen';
import { HeaderButtonContext } from '../Header/HeaderButtonProvider';
import './error.module.css';

const errorMessageTitle = 'УПС';
const somethisngWrongMessage = 'что-то пошло не так';

const Error: React.FC = () => {
  const dispatch = useDispatch();
  const { setLink } = useContext(HeaderButtonContext);

  useEffect(() => {
    setLink('');
  })

  useEffect(() => {
    setTimeout(function() {
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