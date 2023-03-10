import React, { useState, useEffect } from 'react';
import ActionButton from '../Buttons/ActionButton';
import ArrowRight from '../../images/ArrowRight.svg';
import ArrowRightShort from '../../images/ArrowRightShort.svg';
import InputMask from '../InputMask';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import LoaderModal from '../Loading/LoaderModal';
import { fetchVoucherPin } from '../../redux/voucher';
import { AppState } from '../../redux';
import Absence from '../absence';
import BackButton from '../Buttons/BackButton';

const inputTitle = 'Введите ваш пинкод';
const submitButtonTittle = 'Далее';
const cantBeEmptyErrorMessage = 'Дрожно быть заполненым';
const wrongVoucherKeyErrorMessage = 'проверьте правильность пинкода';

const VoucherWithdrawPin: React.FC = () => {
  const { isLoading, isError, voucherSessionKey, showUserAbsence } = useSelector((state: AppState) => state.voucher);
  const dispatch = useDispatch();
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ voucherPin, setVoucherPin ] = useState('');
  const voucherPinLength = 4;

  useEffect(() => {
    if (isError) {
      setErrorMessage(wrongVoucherKeyErrorMessage);
    }
  }, [voucherSessionKey, isError])

  const voucherLoginContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  } as React.CSSProperties;

  const actionButtonStyles = { 
    marginTop: '7.5vh' 
  } as React.CSSProperties;

  const InputMaskStyles = { 
    paddingLeft: '12vw',
    paddingRight: '12vw' 
  } as React.CSSProperties;
  
  const handleChangeInputValue = (value: string) => {
    if (value.length > voucherPinLength) {
      return;
    } else {
      if (errorMessage) {
        setErrorMessage('');
      }
    }

    setVoucherPin(value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (errorMessage) {
      return;
    } else if (
      !voucherPin 
      || voucherPin.length < voucherPinLength
    ) {
      setErrorMessage(cantBeEmptyErrorMessage)
      
      return;
    }

    const data = {
      pin: voucherPin,
      msid: voucherSessionKey
    } 
  
    fetchVoucherPin(data)(dispatch);
  }

  const cleanErrorMessage = () => {
    if (errorMessage) {
      setErrorMessage('');
    }
  }

  const image = window.innerWidth <= 1280 ? ArrowRightShort : ArrowRight;

  return (
    <>
      { isLoading && <LoaderModal /> }
      {  showUserAbsence ? <Absence /> 
        : (
          <>
            <BackButton
              link="/voucher"
            />
            <form onSubmit={handleSubmit}>
              <div className="voucher-pin-container" style={voucherLoginContainerStyles}>
                <InputMask
                  title={inputTitle}
                  onInputChange={handleChangeInputValue}
                  cleanErrorMessage={cleanErrorMessage}
                  length={voucherPinLength}
                  errorMessage={errorMessage}
                  isMasked={true}
                  style={InputMaskStyles}
                />
                <ActionButton
                  title={submitButtonTittle}
                  className="voucher-pin-button"
                  handleButtonClick={handleSubmit}
                  image={image}
                  style={actionButtonStyles}
                />
              </div>
            </form>
          </>
        )
      }
    </>
  )
}

export default VoucherWithdrawPin;