import React from 'react';
import "./index.css";
import Money from "../../images/money.svg";

const weCountBillsText = 'Считаем купюры для выдачи';

const WeCountBills: React.FC = () =>{
  return (
    <>
      <div className="weCountBills-page-wrapper">
        <div className="weCountBills-container-page">
          <img src={Money} alt="image"/>
          <div className="weCountBills-wrapper">
            <span>{weCountBillsText}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default WeCountBills;