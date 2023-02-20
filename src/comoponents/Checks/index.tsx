import React, {useContext, useEffect} from 'react';
import { HeaderContext } from '../Header/HeaderContextProvider';
import paperCheck from '../../images/paper_check.svg';
import Loading from "../Loading";
import './index.css';

const Check: React.FC = () => {
  const { setHideLogo, } = useContext(HeaderContext);

  useEffect(() => {
    setHideLogo(true);
  })
  return (
    <>
      <div className="check-page-wrapper">
          <div className="page-container-check">
            <div className="wrapper-check" style={{ backgroundImage: `url(${paperCheck})` }}>
              {/* <img src={paperCheck} alt=""/> */}
              <div className="block-check">
                <div className="wrapp-loading">
                 <Loading />
                </div>
                <p>Подождите, <br/>
                  печатается чек
                </p>
                <div className="output-check-text">
                  {/* <div className="wrapper">
                    <div className="item-left">Some text</div>
                    <div className="item-left">Some text</div>
                    <div className="item-left">Some text</div>
                  </div>
                  <div className="wrapper">
                    <div className="item-right">Some text</div>
                    <div className="item-right">Some text</div>
                    <div className="item-right">Some text</div>
                  </div> */}
                </div>
                {/* <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p> */}
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Check;