import React, { useContext, useState, useEffect } from 'react';
import ActionButton from '../Buttons/ActionButton';
import ArrowRight from '../../images/ArrowRight.svg';
import ArrowRightShort from '../../images/ArrowRightShort.svg';
import InputMaskItem from '../InputMask/InputMaskItem';
import { connect, useDispatch, useSelector } from 'react-redux';
import LoaderModal from '../Loading/LoaderModal';
import { 
  fetchDepositInit,
  fetchPrintCheck,
  fetchCloseVoucherSession,
  setDepositSum
} from '../../redux/voucher';
import { hideOptionalCheck, showOptionalCheck } from '../../redux/screens';
import { AppState } from '../../redux';
import { WebSocketContext, WS } from '../../WSProvider';
import { Redirect } from 'react-router-dom';
import OptionalCheck from '../OptionalCheck';
import PrintCheck from '../Checks';
import './index.css';
import Absence from '../absence';
import BackButton from '../Buttons/BackButton';
import { CentrifugeContext } from '../../CentrifugeProvider';

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

let VoucherLogin: React.FC = () => {
  //@ts-ignore
  const ws: WS = useContext(WebSocketContext);
  const centrifuge = useContext(CentrifugeContext);
  const dispatch = useDispatch();
  const { 
    isLoading,
    isPrintLoading,
    voucherSessionKey,
    depositSum,
    isBillAccepterReady,
    currency,
    isError,
    errorMessage,
    showUserAbsence,
  } = useSelector((state: AppState) => state.voucher);
  const { isShowOptionalCheck } = useSelector((state: AppState) => state.screens);
  const depositSumInputLength = 10;
  
  useEffect(() => {
    if (!isBillAccepterReady && !isLoading && !isError) {
      fetchDepositInit(voucherSessionKey)(dispatch);
    }

    // if (!ws.socket || ws.socket.readyState > 1) {
    //   ws.setWSConnnection();
    // }

    window.addEventListener('keypress', submitFormHandle);

    return () => window.removeEventListener('keypress', submitFormHandle);
  })

  const submitFormHandle = (e: any) => {
    e.preventDefault();
    
    if (e.keyCode !== 13 || !depositSum) {
      return;
    }
    
    handleActionButton(e);
  }

  const handleActionButton = (e: any) => {
    e.preventDefault();

    dispatch(showOptionalCheck());
  }

  const handlePrintOptionalCheck = () => {
    const data = {
      msid: voucherSessionKey,
      way: 'deposit'
    };

    dispatch(setDepositSum(0));
    fetchPrintCheck(data)(dispatch);
    dispatch(hideOptionalCheck());
  }

  const handleDontPrintOptionalCheck = () => {
    dispatch(setDepositSum(0));
    dispatch(hideOptionalCheck());
    if (centrifuge) {
      centrifuge.disconnect();
    }
    // fetchCloseVoucherSession(voucherSessionKey, ws.closeWSConnection)(dispatch);
    fetchCloseVoucherSession(voucherSessionKey)(dispatch);
  }

  const handleBackButtonLink = () => {
    dispatch(showOptionalCheck());
  }

  const image = window.innerWidth <= 1280 ? ArrowRightShort : ArrowRight;

  return (
    <>
      { isLoading && <LoaderModal /> }
      { isError && <Redirect to="/voucher" /> }
      { !voucherSessionKey && <Redirect to="/" /> }
      { isPrintLoading
        ? <PrintCheck /> 
        : isShowOptionalCheck
        ? <OptionalCheck 
          leftButtonHandle={handlePrintOptionalCheck}
          rightButtonHandle={handleDontPrintOptionalCheck}
          disableLeftButton={!depositSum}
        /> 
        : showUserAbsence ? <Absence /> 
        : (
          <>
            <BackButton
              link={depositSum && depositSum > 0 ? undefined : "/voucher"}
              handleButtonClick={depositSum && depositSum > 0 ? handleBackButtonLink : () => {}}
            />
            <div className="voucher-deposit-container" style={voucherLoginContainerStyles}>
              <div className="input-block" style={inputBlockStyles}>
                <p className="input-title" style={titleStyles}>{inputTitle}:</p>
                  <label htmlFor="voucher" style={labelStyles}>
                    <div className="input-mask" style={inputMaskStyles}>
                      {Array(depositSumInputLength).fill("").map((item, index) => {
                        const depositSumStr = String(depositSum);
                        let value = '';
                        let inputMaskItemClassName = '';

                        if (index >= depositSumInputLength - depositSumStr.length) {
                          const depositSumIndex = depositSumInputLength - depositSumStr.length - index;
                          inputMaskItemClassName = Number(depositSum) > 0 && depositSumIndex <= 0 ? 'deposit-input-mask-item-filled' : '';
                          value = depositSumStr[depositSumIndex < 0 ? (-1) * depositSumIndex : depositSumIndex] ?? '0';
                        }

                        return <InputMaskItem 
                          key={index} 
                          className={inputMaskItemClassName ?? ''} 
                          value={value ? value : '0'}
                          isInputActive={false} 
                          isError={!!errorMessage} isMasked={false} 
                        />
                      })}
                      <p className="input-mask-currency" style={inputMaskCurrencyStyles}>{currency}</p>
                    </div>
                  </label>
                <p className="input-mask-error" style={inputMaskErrorStyles}>{errorMessage}</p>
              </div>
              
              <ActionButton 
                title={actionButtonTitle} 
                className="voucher-deposit-button" 
                handleButtonClick={handleActionButton} 
                image={image} 
                style={actionButtonStyles}
                disable={!depositSum}
              />
            </div>
          </>
        )
      }
    </>
  )
}

export default VoucherLogin = React.memo(VoucherLogin);