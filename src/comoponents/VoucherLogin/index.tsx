import React, { useState, useEffect } from 'react';
import ActionButton from '../Buttons/ActionButton';
import ArrowRight from '../../images/ArrowRight.svg';
import ArrowRightShort from '../../images/ArrowRightShort.svg';
import InputMask from '../InputMask';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import LoaderModal from '../Loading/LoaderModal';
import { fetchVoucherLogin, resetVoucherCloseTimeout } from '../../redux/voucher';
import { AppState } from '../../redux';
import { Redirect } from 'react-router-dom';
import BackButton from '../Buttons/BackButton';
import secondsToHms from '../../utils/secondsToHms';

const onlyNumEerrorMessage = 'Здесь можно воодить только цыфры';
const cantBeEmptyErrorMessage = 'Дрожно быть заполненым';
const wrongVoucherKeyErrorMessage = 'Ваучер не найден';
const voucherSessionIsNotClosedMessage = 'Сессия данного ваучера не закрыта';

const VoucherLogin: React.FC = () => {
  const { 
    isLoading, 
    voucherSessionKey, 
    isError, 
    errorMessage, 
    voucherCloseTimeout 
  } = useSelector((state: AppState) => state.voucher);
  
  const dispatch = useDispatch();
  const [ inputErrorMessage, setInputErrorMessage ] = useState('');
  const [ voucherValue, setVoucherValue ] = useState('');
  const [ voucherCloseTimer, setVoucherCloseTimer ] = useState<number>(voucherCloseTimeout);
  const [ intervalTimer, setIntervalTimer ] = useState<any>(null);
  const voucherValueLength = 10;

  useEffect(() => {
    if (!intervalTimer && voucherCloseTimeout) {
      const interval = setInterval(() => {
        setVoucherCloseTimer(voucherCloseTimer => voucherCloseTimer - 1);
      }, 1000)

      setIntervalTimer(interval);
    }

    if (intervalTimer && typeof voucherCloseTimer === 'number' && voucherCloseTimer <= 0) {
      clearInterval(intervalTimer);
      dispatch(resetVoucherCloseTimeout());
      setInputErrorMessage('');
      setIntervalTimer(null);
    }

  },[voucherCloseTimer, voucherCloseTimeout]);

  useEffect(() => {
    if (!voucherCloseTimer) {
      setVoucherCloseTimer(voucherCloseTimeout);
    }
    if (isError) {
      const errorText = errorMessage?.login === 'Voucher not found.' ? wrongVoucherKeyErrorMessage 
      : errorMessage?.login === 'Voucher session not closed.' ? voucherSessionIsNotClosedMessage + (
        (voucherCloseTimeout && voucherCloseTimer)
        ? `. ОНА БУДЕТ ЗАКРЫТА АВТОМАТИЧЕСКИ ЧЕРЕЗ  ${secondsToHms(voucherCloseTimer)}`: ''
      )
      : wrongVoucherKeyErrorMessage;

      setInputErrorMessage(errorText);
    } else {
      setInputErrorMessage('');
    }

  }, [voucherSessionKey, isError, voucherCloseTimer])
  

  const voucherLoginContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  } as React.CSSProperties; 

  const actionButtonStyles = {
    marginTop: '7.5vh'
  } as React.CSSProperties;

  const inputMaskItemStyles = {
    color: '#FFB800'
  } as React.CSSProperties;
  
  const handleChangeInputValue = (value: string) => {
    const containNotNumbers = /[^0-9]/.test(value);
    if (containNotNumbers && value.length > voucherValue.length) {
      setInputErrorMessage(onlyNumEerrorMessage);
    } else {
      if (inputErrorMessage) {
        setInputErrorMessage('');
        dispatch(resetVoucherCloseTimeout());
      }
    }

    setVoucherValue(value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // if (inputErrorMessage) {
    //   return;
    // } else
    if (
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
      dispatch(resetVoucherCloseTimeout());
    }
  }

  const image = window.innerWidth <= 1280 ? ArrowRightShort : ArrowRight;

  return (
    <>
      {voucherSessionKey && <Redirect to="/voucher" /> }
      {isLoading && <LoaderModal />}
      <BackButton link="/" />
      <form onSubmit={handleSubmit}>
        <div className="voucher-login-container" style={voucherLoginContainerStyles}>
          <InputMask 
            title="Введите ваш логин"
            onInputChange={handleChangeInputValue}
            cleanErrorMessage={cleanInputErrorMessage}
            length={voucherValueLength}
            errorMessage={inputErrorMessage}
            inputMaskItemStyles={inputMaskItemStyles}
          />
          <ActionButton
            title="Далее"
            disable={!!inputErrorMessage}
            className="voucher-login-button"
            handleButtonClick={handleSubmit}
            image={image}
            style={actionButtonStyles}
          />
        </div>
      </form>
    </>
  )
}

export default VoucherLogin;