import React, { useContext, useState } from 'react';
import { HeaderButtonContext } from '../Header/HeaderButtonProvider';
import ActionButton from '../Buttons/ActionButton';
import ArrowRight from '../../images/ArrowRight.svg';
import ArrowRightShort from '../../images/ArrowRightShort.svg';
import InputMask from '../InputMask';
import './index.css';
import { useDispatch } from 'react-redux';

const VoucherLogin: React.FC = () => {
  const dispatch = useDispatch();
  const { link, setLink } = useContext(HeaderButtonContext);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ voucherValue, setVoucherValue ] = useState('');
  const voucherValueLength = 10;

  setLink('/');

  const voucherLoginContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  } as React.CSSProperties;
  
  const handleChangeInputValue = (value: string) => {
    const contanNotNumbers = /[^0-9]/.test(value);

    if (contanNotNumbers) {
      setErrorMessage('Здесь можно воодить только цыфры');
    } else {
      if (errorMessage) {
        setErrorMessage('');
      }
    }

    setVoucherValue(value);
  }

  const handleSubmit = () => {
    if (errorMessage || voucherValue.length < voucherValueLength) {
      console.log('SHOW ERROR NOTIFY');
      
      return;
    }

    console.log('FETCH VOUCHER VALUE', voucherValue);
  }

  const image = window.innerWidth <= 1280 ? ArrowRightShort : ArrowRight;

  return (
    <div className="voucher-login-container" style={voucherLoginContainerStyles}>
      <InputMask 
        title="Введите ваш логин" 
        onInputChange={handleChangeInputValue} 
        length={voucherValueLength} 
        errorMessage={errorMessage}
      />      
      <ActionButton 
        title="Далее" 
        className="voucher-login-button" 
        handleButtonClick={handleSubmit} 
        image={image} 
        style={{ marginTop: '7.5vh' }}
      />
    </div>
  )
}

export default VoucherLogin;