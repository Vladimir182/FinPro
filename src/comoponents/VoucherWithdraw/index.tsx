import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux';
import { Redirect } from 'react-router-dom';
import ActionButton from '../Buttons/ActionButton';
import ArrowRight from '../../images/ArrowRight.svg';
import ArrowRightShort from '../../images/ArrowRightShort.svg';
import { 
  fetchCassetteInfo, 
  fetchVoucherWithdraw, 
  fetchCloseVoucherSession, 
  fetchPrintCheck, 
  setAvailableWithdrawSum,
  fetchShowBalnce 
} from '../../redux/voucher';
import LoaderModal from '../Loading/LoaderModal';
import VoucherPin from '../VoucherPin';
import Absence from '../absence';
import OptionalCheck from '../OptionalCheck';
import PrintCheck from '../Checks';
import WeCountBills from '../WeCountBills';
import BackButton from '../Buttons/BackButton';
import { hideOptionalCheck } from '../../redux/screens';
import './index.css';
import moveCursorToEnd from '../../utils/moveCursorToEnd';
import { CentrifugeContext } from '../../CentrifugeProvider';
import { fetchWssToken } from '../../redux/authorization';

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
  padding: '7.41vh 3vw 0 4vw',
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
  marginLeft: '1vw',
  fontWeight: 'bolder'
} as React.CSSProperties;

const actionButtonStyles = {
  marginTop: '7.5vh',
  // background: 'linear-gradient(180deg, rgba(64, 0, 93, 0) 0%, #8A00C9 98.96%, #8A00C9 100%)'
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

const inputStyles = {
  width: 'auto',
  position: 'absolute',
  left: '-100000px'
} as React.CSSProperties;

const inputSubtitleStyles = {
  minHeight: '4vw',
  display:'flex',
  alignItems: 'center',
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
const invalidSumMessage = 'Не можем выдать такую сумму';
const notEnoughMoneyMessage = 'Недостаточно средств на ваучере';
const terminalLimitIsExceeted = 'Превышен лимит треминала';
const availableSumMessage = `Доступная сумма:`;
const image = window.innerWidth <= 1280 ? ArrowRightShort : ArrowRight;

const VoucherWithdraw: React.FC = () => {
  //@ts-ignore
  const centrifuge = useContext(CentrifugeContext);
  const dispatch = useDispatch();

  let { 
    voucherSessionKey,
    currency,
    availableWithdrawSum,
    cassetteInfo,
    isCassetteInfoLoading,
    isLoading,
    withdrawSum,
    pin,
    balance,
    isError,
    isPinVerified,
    showUserAbsence,
    isPrintLoading,
    showWeCountBills
  } = useSelector((state: AppState) => state.voucher);

  const { isShowOptionalCheck } = useSelector((state: AppState) => state.screens);
  const { wssToken, isWsLoading } = useSelector((state: AppState) => state.authorization);
  const [ isFormSubmitted, setIsFormSubmitted ] = useState(false);
  const [ withdrawSumInput, setwithdrawSumInput ] = useState<any>(withdrawSum ?? placeholderWithdrawSum);
  const inputRef = React.createRef<HTMLInputElement>();
  inputRef.current?.focus();

  useEffect(() => {
    if (!isError && !cassetteInfo && !cassetteInfo?.length && !isLoading && isPinVerified) {
      fetchCassetteInfo({ msid: voucherSessionKey })(dispatch);
    }
    if (!isLoading && balance === null && pin) {
      fetchShowBalnce({
        pin,
        msid: voucherSessionKey
      })(dispatch)
    }

    if (!wssToken && !isWsLoading && voucherSessionKey) {
			fetchWssToken(voucherSessionKey)(dispatch);
		}

    inputRef.current?.focus();
    inputRef.current?.addEventListener('focusout', function() {
      inputRef.current?.focus();
    });
    inputRef.current?.addEventListener('paste', (e: any) => e.preventDefault());
  }, [cassetteInfo, isPinVerified, availableWithdrawSum]);

  useEffect(() => {
    if (wssToken && centrifuge) {
      centrifuge.connect();
    }
  }, [wssToken])

  const handleActionButtonClick = (e: any) => {
    e.preventDefault();

    const data = {
      amount: Number(withdrawSumInput),
      msid: voucherSessionKey,
      pin: pin
    };

    if (!isFormSubmitted) {
      setIsFormSubmitted(true);
    }
    if (Number(withdrawSumInput) > balance) {
      return;
    }

    // if (centrifuge) {
    //   centrifuge.disconnect();
    // }
    // fetchVoucherWithdraw(data, ws.closeWSConnection)(dispatch);
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
    if (!String(value).length || !value.trim()) {
      value = placeholderWithdrawSum;
    }
    if (isFormSubmitted) {
      setIsFormSubmitted(false);
    }
    
    dispatch(setAvailableWithdrawSum(null));

    const parsedValue = value !== placeholderWithdrawSum 
      ? parseInt(value) 
      : value; 

    setwithdrawSumInput(parsedValue);
  }

  const getAvailableBills = (cassetteInfo: Array<{ denomination: number }>) => {
    return cassetteInfo.reduce((res, item, index, array) => {
      const divider = index === array.length - 1 ? '' : ', ';

      return res + item.denomination + divider;
    }, '');
  }

  const handlePrintOptionalCheck = () => {
    const data = {
      msid: voucherSessionKey,
      way: 'withdraw'
    };
    fetchPrintCheck(data)(dispatch);
    dispatch(hideOptionalCheck());
  }

  const handleDontPrintOptionalCheck = () => {
    if (centrifuge) {
      centrifuge.disconnect();
    }

    fetchCloseVoucherSession(voucherSessionKey)(dispatch);
    dispatch(hideOptionalCheck());
  }

  const handleBlockClick = () => {
    inputRef.current?.focus();
  }

  const getErrorMessage = (isFormSubmitted: boolean) => (
    availableWithdrawSum && (availableWithdrawSum === 'Terminal limit is exceeded')
    ? (<span style={{ color: 'red' }}>{terminalLimitIsExceeted}</span>)
    : availableWithdrawSum && (availableWithdrawSum > 0) 
    ? (<>{availableSumMessage}<span className="withdraw-multiple-sum" style={withdrawMultipleSum}>{availableWithdrawSum}</span></>)
    : (availableWithdrawSum === 0 || (availableWithdrawSum && availableWithdrawSum < 0))
    ? (<span style={{ color: 'red' }}>{invalidSumMessage}</span>)
    : balance < withdrawSumInput 
    ? (<span style={{ color: 'red' }}>{notEnoughMoneyMessage}</span>)
    : ''
  )
  
  const errorMessage = getErrorMessage(isFormSubmitted);
  const availableNominalsTitle = `Доступные купюры, ${currency}:`;
  const availableNominals = (isCassetteInfoLoading && (!cassetteInfo || (cassetteInfo && !cassetteInfo.length))) ? '...' 
    : !isLoading && (!cassetteInfo || (cassetteInfo && !cassetteInfo.length)) ? noBillsMessage
    : !isLoading && cassetteInfo ? getAvailableBills(cassetteInfo)
    : '';
  const isActionButtonDisabled = 
    !withdrawSumInput || withdrawSumInput === placeholderWithdrawSum || !!errorMessage
    //  || availableNominals === noBillsMessage;
  
  const withdrawSumStyles = {
    background: '#67219E',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: withdrawSumInput === placeholderWithdrawSum ?'#7E7E7E' : '#FFB800'
  } as React.CSSProperties;

  return (
    <>
      { (isLoading && !isPrintLoading) && <LoaderModal /> }
      {/* { isError && <Redirect to="/voucher" /> } */}
      { !voucherSessionKey && <Redirect to="/" /> }
      { !isPinVerified 
        ? <VoucherPin />
        : showWeCountBills ? <WeCountBills/>
        : showUserAbsence ? <Absence />
        : isPrintLoading ? <PrintCheck />
        : isShowOptionalCheck ? <OptionalCheck
          leftButtonHandle={handlePrintOptionalCheck}
          rightButtonHandle={handleDontPrintOptionalCheck}
        /> : (
          <>
            <BackButton link="/voucher" />
              <form onSubmit={!isActionButtonDisabled ? handleActionButtonClick : (e) => e.preventDefault()}>
                <div className="withdraw-login-container" style={voucherWithdrawContainerStyles}>
                    <div className="withdraw-block" style={inputBlockStyles} onClick={handleBlockClick}>
                      <p className="withdraw-title" style={titleStyles}>
                        {availableNominalsTitle}
                        { <span className="withdraw-multiple-sum" style={withdrawMultipleSum}>{availableNominals}</span> }
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
                                onKeyDown={e => moveCursorToEnd(e.target)}
                                onChange={e => handleChangeWithdrawSum(e.target.value)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <p className="input-subtitle" style={inputSubtitleStyles}>
                        { errorMessage }
                      </p>
                    </div>
                    <ActionButton
                      title={withdrawButtonText}
                      className="voucher-withdraw-button"
                      handleButtonClick={handleActionButtonClick}
                      image={image}
                      style={actionButtonStyles}
                      disable={isActionButtonDisabled}
                    />
                </div>
            </form>
          </>
        )
      }
    </>
  )
}

export default VoucherWithdraw;