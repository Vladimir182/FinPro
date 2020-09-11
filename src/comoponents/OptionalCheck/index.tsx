import React, { useState, useEffect, useContext } from 'react';
import './index.css'
import ActionButton from '../Buttons/ActionButton';
import chackImg from '../../images/check_img.svg'
import { HeaderContext } from '../Header/HeaderContextProvider';
import Absence from '../absence';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux';

type OptionalCheckProps = {
  backButtonLink?: string,
  disableLeftButton?: boolean,
  leftButtonHandle?: () => void,
  rightButtonHandle?: () => void,
}

const optionalCheckText = 'ЖЕЛАЕТЕ НАПЕЧАТАТЬ ЧЕК?';
const leftButtonText = 'Да';
const rightButtonText = 'Нет';
const OptionalCheck: React.FC<OptionalCheckProps> = ({ backButtonLink, leftButtonHandle, rightButtonHandle, disableLeftButton }) => {
  const { showUserAbsence } = useSelector((state: AppState) => state.voucher);
  const { setLink } = useContext(HeaderContext);

  useEffect(() => {
    if (backButtonLink) {
      setLink(backButtonLink)
    }
  }) 

  return (
    <>
     { showUserAbsence ? <Absence /> 
       : <div className="optional-page-wrapper">
        <div className="optional-container-page">
          <div className="optional-wrapper">
            <div className="optional-img">
              <img src={chackImg} alt="" className="optional-img"/></div>     
              <div className="optional-text">{optionalCheckText}</div>
          </div>
          <div className="optional-button-wrapper">
            <ActionButton className="optional-button" disable={disableLeftButton} title={leftButtonText} handleButtonClick={leftButtonHandle} />
            <ActionButton className="optional-button" title={rightButtonText} handleButtonClick={rightButtonHandle} /> 
          </div>
        </div>
       
      </div>}
    </>
  )
}


export default OptionalCheck;