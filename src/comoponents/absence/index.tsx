import React, { useState, useEffect, useContext } from 'react';
import imgAbsenec from '../../images/absence.svg';
import absenceMessage from '../../images/absence_img.svg';
import Loader from '../Loading/index';
import ActionButton from '../Buttons/ActionButton';
import { fetchCloseVoucherSession, setShowUserAbsence } from '../../redux/voucher';
import { AppState } from '../../redux';
import { useSelector, useDispatch } from 'react-redux';
import { CentrifugeContext } from '../../CentrifugeProvider';
import './index.css';
import { hideOptionalCheck } from '../../redux/screens';

const absenceMessageTitle = 'ВЫ ЕЩЕ ЗДЕСЬ?';

const Absence: React.FC = () => {
  const centrifuge = useContext(CentrifugeContext);
  const { voucherSessionKey } = useSelector((state: AppState) => state.voucher);
  const [ timer, setTimer ] = useState<number>(Number(process.env.REACT_APP_CLOSE_SESSION_USER_ABSENCE_TIMEOUT_SECONDS));
  const [ intervalTimer, setIntervalTimer ] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!intervalTimer) {
      const interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000)

      setIntervalTimer(interval);
    }
    if (timer <= 0) {
      clearInterval(intervalTimer);
      setIntervalTimer(null);
      dispatch(setShowUserAbsence(false));
      
      if (centrifuge) {
        centrifuge.disconnect();
      }
      fetchCloseVoucherSession(voucherSessionKey)(dispatch);
      dispatch(hideOptionalCheck());
      setTimer(Number(process.env.REACT_APP_CLOSE_SESSION_USER_ABSENCE_TIMEOUT_SECONDS));
    }

  },[timer]);

  const handleActionButtonClick = () => {
    clearInterval(intervalTimer)
    dispatch(setShowUserAbsence(false));
  }

  return (
    <>
      <div className="absence-page-wrapper">
        <div className="absence-container-page">
          <div className="absence-img-wrapper">
            <img src={imgAbsenec} alt="image"/>
            <div id="spin" className="absence-spinner">
              <Loader />
            </div>
            <div className="absence-counter">{`${timer} сек`}</div>
            <div className="absence-message">
              <img src={absenceMessage} alt="image"/>
              <div className="absence-text">{absenceMessageTitle}</div>
            </div>
          </div>
          <div className="absence-button-wrapper">
            <ActionButton  className="absence-button" title="Да" handleButtonClick={handleActionButtonClick} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Absence;
