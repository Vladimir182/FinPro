import React, { useContext, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState } from '../../redux';
import { HeaderContext } from '../Header/HeaderContextProvider';
import BaseButton from '../Buttons/BaseButton';
import deposit from '../../images/Deposit.svg';
import withdraw from '../../images/Withdraw.svg';
import balance from '../../images/Balance.svg';
import Absence from '../Absence';
import './index.css';

const depoistButtonText = 'Пополнить';
const widhdrawButtonText = 'Снять';
const checkBalanceButtonText = 'Проверить баланс';
const buttonStyles = {};

const VoucherRoads: React.FC = () => {
  let { voucherSessionKey, showUserAbsence } = useSelector((state: AppState) => state.voucher);
  let { setLink, setStopVoucherSession, setHideLogo } = useContext(HeaderContext);
  
  useEffect(() => {
    setStopVoucherSession(true);
    // setHideLogo(true);
    // setLink('/');
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
            // onClick={() => console.log('click')}
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
            image={balance}
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