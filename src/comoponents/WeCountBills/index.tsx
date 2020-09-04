import React from 'react';

import "./index.css";
import Money from "../../images/money.svg"
const WeCountBills: React.FC = () =>{

  return (
    <>
      <div className="weCountBills-page-wrapper">
        <div className="weCountBills-container-page">
          <img src={Money} alt="image"/>
          <div className="weCountBills-wrapper">
            <span>Считаем купюры для выдачи</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default WeCountBills;