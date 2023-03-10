import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Arrow from '../../../images/ArrowLeft.svg';
import './index.css';

const backButton = {
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(180deg, #56007D 0%, #9100D2 52.08%, #8A00C9 98.96%, #61018C 100%)',
  borderRadius: '14px',
  display: 'flex',
  fontStyle: 'normal',
  left: '5px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  fontWeight: 'bolder',
  color: '#ffffff'
} as React.CSSProperties;

const layer = {
  justifyContent: "center",
  justifyItems: "center",
  background: 'linear-gradient(180deg, #40005D 0%, #7400A8 100%)',
  borderRadius: '20px',
  display: "flex",
  position: 'absolute',
  left: '60px'
} as React.CSSProperties;

type BackButtonProps = {
  link?: string,
  handleButtonClick?: () => void
}

const backButtonText = 'Назад';

const BackButton: React.FC<BackButtonProps> = ({ link, handleButtonClick }) => {
  const buttonRef = useRef(null);

  const handleBackButtonKeydown = (e: any) => {
    if (e.keyCode !== 27) {
      return;
    }
    if (handleButtonClick) {
      handleButtonClick();
    }
    if (buttonRef?.current) {      
      //@ts-ignore
      buttonRef?.current?.click()
    } 
  }

  useEffect(() => {
    window.addEventListener('keydown', handleBackButtonKeydown);

    return () => window.removeEventListener('keydown', handleBackButtonKeydown);
  });



  return (
    <div style={layer} className='layer'>
      { 
        link 
        ? <NavLink
            ref={buttonRef}
            to={link} 
            style={backButton} 
            className='backButton' 
            onClick={handleButtonClick}
          >
            <img src={Arrow} alt=""/>
            {backButtonText}
          </NavLink>
        : <div
          ref={buttonRef}
          style={backButton} 
          className='backButton' 
          onClick={handleButtonClick}
        >
          <img src={Arrow} alt=""/>
          {backButtonText}
        </div>
      }
    </div>
  )
}

export default BackButton;