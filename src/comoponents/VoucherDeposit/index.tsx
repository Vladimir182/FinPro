import React, { useContext, useState, useEffect } from 'react';
import { HeaderContext } from '../Header/HeaderContextProvider';
import ActionButton from '../Buttons/ActionButton';
import ArrowRight from '../../images/ArrowRight.svg';
import ArrowRightShort from '../../images/ArrowRightShort.svg';
import InputMaskItem from '../InputMask/InputMaskItem';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import LoaderModal from '../Loading/LoaderModal';
import { AppState } from '../../redux';
import { WebSocketContext } from '../../WSProvider';
// import { Redirect } from 'react-router-dom';

const inputBlockStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position:'relative',
  background: '#480081',
  boxShadow: '0px 4px 30px rgba(174, 130, 225, 0.2)',
  padding: '7.41vh 3vw 10vh 3vw',
  boxSizing: 'border-box'
} as React.CSSProperties;

const titleStyles = {
  textAlign: 'center',
  fontWeight: 'bolder',
  margin: 0,
  marginBottom: '4.07vh',
  color: '#fff',
  textTransform: 'uppercase'
} as React.CSSProperties;

const labelStyles = {
  display: 'block'
} as React.CSSProperties;

const inputMaskStyles = {
  display: 'flex',
} as React.CSSProperties;

const inputMaskErrorStyles = {
  display: 'inline-block',
  position: 'absolute',
  bottom: '3vh',
  fontStyle: 'normal',
  fontWeight: 'normal',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: '#FF0000',
  margin: 0
} as React.CSSProperties;

const inputMaskCurrencyStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#FFB800',
} as React.CSSProperties;

const voucherLoginContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
} as React.CSSProperties;

const actionButtonStyles = { 
  marginTop: '7.5vh' 
} as React.CSSProperties;

const inputTitle = 'Внесено';
const actionButtonTitle = 'Завершить';

const VoucherLogin: React.FC = () => {
  const { 
    isLoading,
    voucherSessionKey,
    depositSum,
    currency,
    isError,
    errorMessage
  } = useSelector((state: AppState) => state.voucher);
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  const { setLink } = useContext(HeaderContext);
  const depositSumInputLength = 10;
  
  useEffect(() => {
    if (isError) {
    }
  }, [voucherSessionKey, isError])

  useEffect(() => {
    setLink('/');
  })

  const handleSubmit = () => {
    
  }

  const image = window.innerWidth <= 1280 ? ArrowRightShort : ArrowRight;

  return (
    <>
      {isLoading && <LoaderModal />}
      <div className="voucher-deposit-container" style={voucherLoginContainerStyles}>
        <div className="input-block" style={inputBlockStyles}>
          <p className="input-title" style={titleStyles}>{inputTitle}:</p>
            <label htmlFor="voucher" style={labelStyles}>
              <div className="input-mask" style={inputMaskStyles}>
                {Array(depositSumInputLength).fill("").map((item, index) => {
                  const depositSumStr = String(depositSum);
                  let value = '';

                  if (index >= depositSumInputLength - depositSumStr.length) {
                    const depositSumIndex = depositSumInputLength - depositSumStr.length - index;

                    value = depositSumStr[depositSumIndex < 0 ? (-1) * depositSumIndex : depositSumIndex] ?? '0';
                  }

                  return <InputMaskItem key={index} className={value ? 'deposit-input-mask-item-filled' : ''} value={value ? value : '0'} isInputActive={false} isError={!!errorMessage} isMasked={false} />
                })}
                <p className="input-mask-currency" style={inputMaskCurrencyStyles}>{currency}</p>
              </div>
            </label>
          <p className="input-mask-error" style={inputMaskErrorStyles}>{errorMessage}</p>
        </div>
        
        <ActionButton 
          title={actionButtonTitle} 
          className="voucher-deposit-button" 
          handleButtonClick={handleSubmit} 
          image={image} 
          style={actionButtonStyles}
        />
      </div>
    </>
  )
}

export default VoucherLogin;