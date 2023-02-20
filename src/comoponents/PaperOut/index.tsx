import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hidePrinterError } from '../../redux/screens';
import { resetVoucherErrors } from '../../redux/voucher';
import PaperOutImg from '../../images/checkPaperOut.svg'
import PaperOutMessage from '../../images/absence_img.svg';
import './index.css';

const paperOfMessageTitle = 'Проблемы в работе принтера';
const paperOfMessage = 'ОЙ(';
const paperOfSubmessage = 'Обратитесь за технической поддрежкой!';

const PaperOut: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(function() {
      dispatch(resetVoucherErrors());
      dispatch(hidePrinterError());
    }, Number(process.env.REACT_APP_REQUEST_ERROR_TIMEOUT));
  });

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
                {paperOfSubmessage}
              </div>
            </div>
          </div>
       </div>
     </div>
    </>
  )
}

export default PaperOut;