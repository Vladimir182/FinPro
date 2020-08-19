import React,{useState, useEffect} from 'react';

import './index.css';
import imgAbsenec from '../../images/absence.svg';
import absenceMessage from '../../images/absence_img.svg';
import Loader from '../Loading/index';
import ActionButton from '../Buttons/ActionButton';

const absenceMessageTitle = 'ВЫ ЕЩЕ ЗДЕСЬ?';
const absenceTimer = '30 сек';

const Absence: React.FC = () => {

    
// const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    

// useEffect(() => {
//     const timer = setTimeout(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);
//   });

    return (
        <>
          <div className="absence-page-wrapper">
              <div className="absence-container-page">
                  <div className="absence-img-wrapper">
                      <img src={imgAbsenec} alt="image"/>
                      <div className="absence-spinner"><Loader />
                      </div>
                      <div className="absence-counter">{absenceTimer}</div>
                      <div className="absence-message">
                        <img src={absenceMessage} alt="image"/>
                          <div className="absence-text">{absenceMessageTitle}</div>
                      </div>
                  </div>
                  <div className="absence-button-wrapper">
                    <ActionButton  className="absence-button" title="Да" handleButtonClick={() => console.log('CLICK')} />
                  </div>
              </div>
          </div>
        </>
    )
}

export default Absence;
