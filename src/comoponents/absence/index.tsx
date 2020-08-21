import React, { useState, useEffect } from 'react';

import './index.css';
import imgAbsenec from '../../images/absence.svg';
import absenceMessage from '../../images/absence_img.svg';
import Loader from '../Loading/index';
import ActionButton from '../Buttons/ActionButton';
import { fetchCloseVoucherSession, setShowUserAbsence } from '../../redux/voucher';
import { AppState } from '../../redux';
import { useSelector, useDispatch } from 'react-redux';

const absenceMessageTitle = 'ВЫ ЕЩЕ ЗДЕСЬ?';
const Absence: React.FC = () => {
  const { voucherSessionKey } = useSelector((state: AppState) => state.voucher);
  const [ timer, setTimer ] = useState<number>(30);
  const dispatch = useDispatch();
  let intervalTimer: any = null;
 
  useEffect(() => {
    if (!intervalTimer) {
      intervalTimer = setInterval(function() {
        setTimer( timer => timer - 1);
      }, 1000)
    }
    if (timer <= 0) {
      fetchCloseVoucherSession(voucherSessionKey)(dispatch);
      dispatch(setShowUserAbsence(false));
      clearInterval(intervalTimer);
    }
    return () => clearInterval(intervalTimer);
  });

  const handleActionButtonClick = () => {
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
