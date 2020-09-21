import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState } from '../../redux';
import { HeaderContext } from '../Header/HeaderContextProvider';
import BaseButton from '../Buttons/BaseButton';
import deposit from '../../images/Deposit.svg';
import withdraw from '../../images/Withdraw.svg';
import balanceImage from '../../images/Balance.svg';
import { resetVoucherPin, resetBillAccepter, resetVoucherErrors, setCassetteInfo, resetBalnce } from '../../redux/voucher';
import Absence from '../absence';
import './index.css';

const depoistButtonText = 'Пополнить';
const widhdrawButtonText = 'Снять';
const checkBalanceButtonText = 'Проверить баланс';
const buttonStyles = {};

const VoucherRoads: React.FC = () => {
  let { 
    voucherSessionKey, 
    showUserAbsence, 
    cassetteInfo,
    isPinVerified, 
    pin, 
    isBillAccepterReady,
    balance,
    isError 
  } = useSelector((state: AppState) => state.voucher);  
  const { link, setLink, setStopVoucherSession, showOptionalCheck, setShowOptionalCheck } = useContext(HeaderContext);
  const dispatch = useDispatch();

  useEffect(() => {
    setStopVoucherSession(true);
    // pin || isPinVerified
    if (pin) {
      dispatch(resetVoucherPin());
    }
    if (isBillAccepterReady) {
      dispatch(resetBillAccepter());
    }
    if (link !== '/') {
      setLink('/');
    }
    if (showOptionalCheck) {
      setShowOptionalCheck(false);
    }
    if (isError) {
      dispatch(resetVoucherErrors());
    }
    if (cassetteInfo) {
      dispatch(setCassetteInfo(null));
    }
    if (balance !== null) {
      dispatch(resetBalnce());
    }
  })

  return (
    <>
      { !voucherSessionKey && <Redirect to="/" /> }
      {
        showUserAbsence ? <Absence />
        : <div className="voucher-container">
          <BaseButton
            className="voucher-button"
            link="/voucher-deposit"
            title={depoistButtonText}
            image={deposit}
            style={buttonStyles}
          />
          <BaseButton
            className="voucher-button"
            title={widhdrawButtonText}
            link="/voucher-withdraw"
            image={withdraw}
            style={buttonStyles}
          />
          <BaseButton
            className="voucher-button"
            title={checkBalanceButtonText}
            link="/voucher-balance"
            image={balanceImage}
            style={{
              ...buttonStyles,
              marginRight: '0'
            }}
          />
        </div>
      }
    </>
  )
}

export default VoucherRoads;