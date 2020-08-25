import React from 'react';

import './index.css'
import ActionButton from '../Buttons/ActionButton';
import chackImg from '../../images/check_img.svg'

const OptionalCheck: React.FC = () => {

  return ( 
    <>
      <div className="optional-page-wrapper">
        <div className="optional-container-page">
          <div className="optional-wrapper">
            <div className="optional-img">
               <img src={chackImg} alt="" className="optional-img"/></div>     
           
            <div className="optional-text">ЖЕЛАЕТЕ НАПЕЧАТАТЬ ЧЕК?</div>
          </div>
          <div className="optional-button-wrapper">
            <ActionButton className="optional-button" title="Да"/>
            <ActionButton className="optional-button" title="Нет"/> 
          </div>
        </div>
       
      </div>
    </>
  )
}


export default OptionalCheck;