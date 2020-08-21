import React, { useEffect, useContext } from 'react';
import { HeaderContext } from '../Header/HeaderContextProvider';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux';
import { Redirect } from 'react-router-dom';
import ActionButton from '../Buttons/ActionButton';
import WithdrawAction from '../../images/WithdrawAction.svg';
import DepositAction from '../../images/DepositAction.svg';
import './index.css';

const voucherBalanceContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
} as React.CSSProperties;

const inputBlockStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position:'relative',
  background: '#480081',
  boxShadow: '0px 4px 30px rgba(174, 130, 225, 0.2)',
  padding: '7.41vh 4vw 4vw',
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

const balanceActionWrapperStyles = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '7.5vh' 
}

const actionButtonStyles = {
  width: '45%',
  marginRight: '5%',
} as React.CSSProperties;

const balanceSumWrapper = {
  background: '#540088',
} as React.CSSProperties;

const balanceSumStyles = {
  background: '#67219E',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'uppercase',
  fontStyle: 'normal',
  fontWeight: 'bold',
  color: '#FFB800'
} as React.CSSProperties;

const balanceTitle = 'Ваш баланс';
const balanceDepositActionButtonTitle = 'Пополнить';
const balanceWithdrawActionButtonTitle = 'Снять';

const VoucherBalance: React.FC = (props: any) => {
  const { voucherSessionKey, currency, balance } = useSelector((state: AppState) => state.voucher);
  const { setLink, setStopVoucherSession } = useContext(HeaderContext);
  
  useEffect(() => {
    setLink('/voucher');
    setStopVoucherSession(false);
  })

  return (
    <>
      { !voucherSessionKey && <Redirect to="/" /> }
      <div className="balance-login-container" style={voucherBalanceContainerStyles}>
        <div className="balance-block" style={inputBlockStyles}>
          <p className="balance-title" style={titleStyles}>{balanceTitle}</p>
          <div className="balance-sum-wrapper" style={balanceSumWrapper}>
            <div className="balance-sum" style={balanceSumStyles}>{ balance } { currency }</div>
          </div>
        </div>
        <div className="balance-action-wrapper" style={balanceActionWrapperStyles}>
          <ActionButton
            title={balanceDepositActionButtonTitle}
            className="voucher-balance-button"
            link="/voucher-deposit"
            image={DepositAction}
            style={actionButtonStyles}
          />
          <ActionButton
            title={balanceWithdrawActionButtonTitle} 
            className="voucher-balance-button" 
            link="/voucher-withdraw" 
            image={WithdrawAction} 
            style={{ ...actionButtonStyles, marginRight: 0 }}
          />
        </div>
      </div>
    </>
  )  
}

export default VoucherBalance;