import React, { useEffect, useContext, useState } from 'react';
import { HeaderContext } from '../Header/HeaderContextProvider';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux';
import { Redirect } from 'react-router-dom';
import ActionButton from '../Buttons/ActionButton';
import ArrowRight from '../../images/ArrowRight.svg';
import ArrowRightShort from '../../images/ArrowRightShort.svg';
import './index.css';
import { fetchCassetteInfo, fetchVoucherWithdraw } from '../../redux/voucher';
import LoaderModal from '../Loading/LoaderModal';
import VoucherPin from '../VoucherPin';

const voucherWithdrawContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
} as React.CSSProperties;

const inputBlockStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position:'relative',
  background: '#480081',
  boxShadow: '0px 4px 30px rgba(174, 130, 225, 0.2)',
  padding: '7.41vh 3vw 4vw',
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

const withdrawMultipleSum = {
  color: '#FFB800',
  marginLeft: '1vw'
} as React.CSSProperties;

const actionButtonStyles = {
  marginTop: '7.5vh' ,
  background: 'linear-gradient(180deg, rgba(64, 0, 93, 0) 0%, #8A00C9 98.96%, #8A00C9 100%)'
} as React.CSSProperties;

const withdrawSumOuterWrapper = {

} as React.CSSProperties;

const withdrawSumWrapper = {
  background: '#540088',
} as React.CSSProperties;

const withdrawSumMiddleWrapper = {
  background: '#FFB600',
  padding: '4px'
} as React.CSSProperties;

const withdrawSumStyles = {
  background: '#67219E',
  display: 'flex',
  alignItems: 'center',
  textTransform: 'uppercase',
  fontStyle: 'normal',
  fontWeight: 'bold',
  color: '#7E7E7E'
} as React.CSSProperties;

const inputStyles = {
  width: 'auto',
  position: 'absolute',
  left: '-100000px'
} as React.CSSProperties;

const inputSubtitleStyles = {
  display: 'inline-block',
  position: 'absolute',
  bottom: '2vh',
  fontStyle: 'normal',
  fontWeight: 'normal',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: '#fff',
  margin: 0
} as React.CSSProperties;

const withdrawButtonText = 'Далее';
const placeholderWithdrawSum = 'Введите сумму';
const noBillsMessage = 'Нет купюр';
const invalidSumMessage = 'Не можем выдать такую сумму'
const image = window.innerWidth <= 1280 ? ArrowRightShort : ArrowRight;

const VoucherWithdraw: React.FC = () => {
  let { 
    voucherSessionKey,
    currency,
    availableWithdrawSum,
    cassetteInfo,
    isLoading,
    withdrawSum,
    pin,
    isError,
    isPinVerified
  } = useSelector((state: AppState) => state.voucher);
  const [ withdrawSumInput, setwithdrawSumInput ] = useState(withdrawSum ?? placeholderWithdrawSum);
  const { setLink, setStopVoucherSession } = useContext(HeaderContext);
  const inputRef = React.createRef<HTMLInputElement>();
  const dispatch = useDispatch();
  
  useEffect(() => {
    setLink('/voucher');
    setStopVoucherSession(false);
    
    if (!isError && !cassetteInfo.length && !isLoading && isPinVerified) {
      fetchCassetteInfo({ msid: voucherSessionKey })(dispatch);
    }
  }, [cassetteInfo, isPinVerified]);

  const handleActionButtonClick = () => {
    
    const data = {
      amount: Number(withdrawSumInput),
      msid: voucherSessionKey,
      pin: pin
    };

    fetchVoucherWithdraw(data)(dispatch);
  }

  const handleChangeWithdrawSum = (value: string) => {
    if (new RegExp(placeholderWithdrawSum).test(value)) {
      value = value.replace(placeholderWithdrawSum, '');
    }
    if (
      String(value).length > 0 && String(Number(value)) === 'NaN' 
      || String(value).length > 12
    ) {  
      return;
    }
    if (!String(value).length) {
      value = placeholderWithdrawSum;
    }
    
    setwithdrawSumInput(value);
  }

  const getAvailableBills = (cassetteInfo: Array<{ denomination: number }>) => {
    return cassetteInfo.reduce((res, item, index, array) => {
      const divider = index === array.length - 1 ? '' : ', ';

      return res + item.denomination + divider;
    }, '');
  }
  
  const availableNominalsTitle = `Доступные купюры, ${currency}:`;
  const availableNominals = (!cassetteInfo || (cassetteInfo && !cassetteInfo.length)) ? noBillsMessage : getAvailableBills(cassetteInfo);
  const availableSumMessage = `Доступная сумма:`;

  return (
    <>
      { isLoading && <LoaderModal /> }
      { isError && <Redirect to="/voucher" /> }
      { !voucherSessionKey && <Redirect to="/" /> }
      { !isPinVerified 
        ? <VoucherPin />
        : <div className="withdraw-login-container" style={voucherWithdrawContainerStyles}>
          <div className="withdraw-block" style={inputBlockStyles}>
            <p className="withdraw-title" style={titleStyles}>
              {availableNominalsTitle}
              { !isLoading && <span className="withdraw-multiple-sum" style={withdrawMultipleSum}>{availableNominals}</span> }
            </p>
            <div className="withdraw-sum-outer-wrapper" style={withdrawSumOuterWrapper}>
              <div className="withdraw-sum-outer-middle-wrapper" style={withdrawSumMiddleWrapper}>
                <div className="withdraw-sum-wrapper" style={withdrawSumWrapper}>
                  <label>
                    <div className="withdraw-sum" style={withdrawSumStyles}>{withdrawSumInput}</div>
                    <input 
                      id="voucher" 
                      ref={inputRef}  
                      style={inputStyles} 
                      value={withdrawSumInput} 
                      onChange={e => handleChangeWithdrawSum(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
            { availableWithdrawSum !== null  && (
              <p className="input-subtitle" style={inputSubtitleStyles}>
                { (availableWithdrawSum && availableWithdrawSum > 0) 
                  ? (<>{availableSumMessage}<span className="withdraw-multiple-sum" style={withdrawMultipleSum}>{availableWithdrawSum}</span></>)
                  : <span style={{ color: 'red' }}>{invalidSumMessage}</span>
                }
              </p>
            )}
          </div>
          <ActionButton
            title={withdrawButtonText}
            className="voucher-withdraw-button"
            handleButtonClick={handleActionButtonClick}
            image={image}
            style={actionButtonStyles}
          />
        </div>
      }
    </>
  )
}

export default VoucherWithdraw;