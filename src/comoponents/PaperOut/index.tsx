import React from 'react';

import './index.css';
import PaperOutImg from '../../images/checkPaperOut.svg'
import PaperOutMessage from '../../images/absence_img.svg';

const paperOfMessageTitle = 'Извините, закончилась бумага';
const paperOfMessage = 'ОЙ(';

const PaperOut: React.FC = () => {
  return (
    <>
     <div className="paperOut-page-wrapper">
       <div className="paperOut-container">
            <div className="paperOut-info-text">
            {paperOfMessageTitle}
            </div>
            <div className="paperOutImg-wrapper">
              <div className="paperOut-img">
                <img src={PaperOutImg} alt="image"/>
                <div className="paperOut-message">
                  <div className="paperOut-message-text">
                      {paperOfMessage}
                    </div>
                  <img src={PaperOutMessage} alt="image"/>
                </div>
              </div> 
              <div className="paperOutImg-text-wrapper">
                <div className="paperOutImg-text">
                  Здесь будет информация в будущем
                </div>
              </div>
            </div>  
       </div>
     </div>
    </>
  )
}

export default PaperOut;