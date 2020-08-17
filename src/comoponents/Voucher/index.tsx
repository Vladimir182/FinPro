import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState } from '../../redux';
import { HeaderButtonContext } from '../Header/HeaderButtonProvider';
import BaseButton from '../Buttons/BaseButton';
import deposit from '../../images/Deposit.svg';
import withdraw from '../../images/Withdraw.svg';
import balance from '../../images/Balance.svg';
import './index.css';

const depoistButtonText = 'Пополнить';
const widhdrawButtonText = 'Снять';
const checkBalanceButtonText = 'Проверить баланс';
const buttonStyles = {};

const VoucherRoads: React.FC = () => {
  let { voucherSessionKey } = useSelector((state: AppState) => state.voucher);
  const { setLink } = useContext(HeaderButtonContext);
  voucherSessionKey = 'sadasd'
  
  useEffect(() => {
    setLink('/');
  })
  
  return (
    <>
      { !voucherSessionKey && <Redirect to="/voucher-login" /> }
      <div className="voucher-container">
        <BaseButton
          className="voucher-button"
          link="/voucher-deposit"
          title={depoistButtonText}
          onClick={() => console.log('click')}
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
    </>
  )
}

export default VoucherRoads;