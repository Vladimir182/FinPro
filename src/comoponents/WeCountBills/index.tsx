import React, { useContext, useEffect } from 'react';
import "./index.css";
import Money from "../../images/money.svg";
import { HeaderContext } from '../Header/HeaderContextProvider';

const weCountBillsText = 'Считаем купюры для выдачи';

const WeCountBills: React.FC = () =>{
  const { setLink } = useContext(HeaderContext);

  useEffect(() => {
    setLink('');
  })

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