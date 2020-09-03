import React, { useContext, useState, useEffect } from 'react';
import { HeaderContext } from '../Header/HeaderContextProvider';
import ActionButton from '../Buttons/ActionButton';
import ArrowRight from '../../images/ArrowRight.svg';
import ArrowRightShort from '../../images/ArrowRightShort.svg';
import InputMask from '../InputMask';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import LoaderModal from '../Loading/LoaderModal';
import { fetchVoucherLogin } from '../../redux/voucher';
import { AppState } from '../../redux';
import { Redirect } from 'react-router-dom';

const onlyNumEerrorMessage = 'Здесь можно воодить только цыфры';
const cantBeEmptyErrorMessage = 'Дрожно быть заполненым';
const wrongVoucherKeyErrorMessage = 'Ваучер не найден';
const voucherSessionIsNotClosedMessage = 'Сессия данного ваучера не закрыта';

const VoucherLogin: React.FC = () => {
  const { isLoading, voucherSessionKey, isError, errorMessage } = useSelector((state: AppState) => state.voucher);
  const dispatch = useDispatch();
  const { setLink } = useContext(HeaderContext);
  const [ inputErrorMessage, setInputErrorMessage ] = useState('');
  const [ voucherValue, setVoucherValue ] = useState('');
  const voucherValueLength = 10;

  useEffect(() => {
    if (isError) {
      const errorText = errorMessage?.login === 'Voucher not found.' ? wrongVoucherKeyErrorMessage 
      : errorMessage?.login === 'Voucher session not closed.' ? voucherSessionIsNotClosedMessage
      : wrongVoucherKeyErrorMessage;

      setInputErrorMessage(errorText);
    }
  }, [voucherSessionKey, isError])

  useEffect(() => {
    setLink('/');
  })

  const voucherLoginContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  } as React.CSSProperties;

  const actionButtonStyles = { 
    marginTop: '7.5vh' 
  } as React.CSSProperties;
  
  const handleChangeInputValue = (value: string) => {
    const containNotNumbers = /[^0-9]/.test(value);
    if (containNotNumbers && value.length > voucherValue.length) {
      setInputErrorMessage(onlyNumEerrorMessage);
    } else {
      if (inputErrorMessage) {
        setInputErrorMessage('');
      }
    }

    setVoucherValue(value);
  }

  const handleSubmit = () => {
    if (inputErrorMessage) {
      return;
    } else if (
      !voucherValue 
      || voucherValue.length < voucherValueLength
    ) {
      setInputErrorMessage(cantBeEmptyErrorMessage)
      
      return;
    }

    fetchVoucherLogin(voucherValue)(dispatch);
  }

  const cleanInputErrorMessage = () => {
    if (inputErrorMessage) {
      setInputErrorMessage('');
    }
  }

  const image = window.innerWidth <= 1280 ? ArrowRightShort : ArrowRight;

  return (
    <>
      {voucherSessionKey && <Redirect to="/voucher" /> }
      {isLoading && <LoaderModal />}
      <div className="voucher-login-container" style={voucherLoginContainerStyles}>
        <InputMask 
          title="Введите ваш логин" 
          onInputChange={handleChangeInputValue}
          cleanErrorMessage={cleanInputErrorMessage}
          length={voucherValueLength} 
          errorMessage={inputErrorMessage}
        />      
        <ActionButton 
          title="Далее" 
          className="voucher-login-button" 
          handleButtonClick={handleSubmit} 
          image={image} 
          style={actionButtonStyles}
        />
      </div>
    </>
  )
}

export default VoucherLogin;