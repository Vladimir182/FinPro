import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState } from '../../redux';
import BaseButton from '../Buttons/BaseButton';
import deposit from '../../images/Deposit.svg';
import withdraw from '../../images/Withdraw.svg';
import balanceImage from '../../images/Balance.svg';
import { 
  resetVoucherPin, 
  resetBillAccepter, 
  resetVoucherErrors, 
  setCassetteInfo, 
  resetBalnce, 
  fetchCloseVoucherSession
} from '../../redux/voucher';
import Absence from '../absence';
import BackButton from '../Buttons/BackButton';
import './index.css';
import LoaderModal from '../Loading/LoaderModal';
import { CentrifugeContext } from '../../CentrifugeProvider';

const depoistButtonText = 'Пополнить';
const widhdrawButtonText = 'Снять';
const checkBalanceButtonText = 'Проверить баланс';
const buttonStyles = {};

const VoucherRoads: React.FC = () => {
  const centrifuge = useContext(CentrifugeContext);
  let { 
    voucherSessionKey, 
    showUserAbsence, 
    cassetteInfo,
    pin, 
    isBillAccepterReady,
    balance,
    isLoading,
    isError
  } = useSelector((state: AppState) => state.voucher);  
  const dispatch = useDispatch();

  useEffect(() => {
    if (centrifuge && !isLoading) {
      centrifuge.connect();
    }
    if (pin) {
      dispatch(resetVoucherPin());
    }
    if (isBillAccepterReady) {
      dispatch(resetBillAccepter());
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

  const handleBackButton = () => {
    if (voucherSessionKey) {
      fetchCloseVoucherSession(voucherSessionKey)(dispatch);
    }
    if (centrifuge) {
      centrifuge.disconnect();
    }
  }

  return (
    <>
      { isLoading && <LoaderModal /> }
      { !voucherSessionKey && <Redirect to="/" /> }
      {
        showUserAbsence ? <Absence />
        : (
          <>
            <BackButton 
              link="/"
              handleButtonClick={handleBackButton}
            />
            <div className="voucher-container">
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
          </>
        )
      }
    </>
  )
}

export default VoucherRoads;