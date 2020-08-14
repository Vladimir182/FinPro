import React, { useContext, useState, useEffect } from 'react';
import { HeaderButtonContext } from '../Header/HeaderButtonProvider';
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

const VoucherLogin: React.FC = () => {
  const { isLoading, isError, voucherSessionKey } = useSelector((state: AppState) => state.voucher);
  const dispatch = useDispatch();
  const { link, setLink } = useContext(HeaderButtonContext);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ voucherValue, setVoucherValue ] = useState('');
  const voucherValueLength = 10;

  useEffect(() => {
    if (isError) {
      setErrorMessage(wrongVoucherKeyErrorMessage);
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
    const contanNotNumbers = /[^0-9]/.test(value);
    if (contanNotNumbers && value.length > voucherValue.length) {
      setErrorMessage(onlyNumEerrorMessage);
    } else {
      if (errorMessage) {
        setErrorMessage('');
      }
    }

    setVoucherValue(value);
  }

  const handleSubmit = () => {
    if (errorMessage) {
      return;
    } else if (
      !voucherValue 
      || voucherValue.length < voucherValueLength
    ) {
      setErrorMessage(cantBeEmptyErrorMessage)
      
      return;
    }

    fetchVoucherLogin(voucherValue)(dispatch);
  }

  const cleanErrorMessage = () => {
    if (errorMessage) {
      setErrorMessage('');
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
          cleanErrorMessage={cleanErrorMessage}
          length={voucherValueLength} 
          errorMessage={errorMessage}
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