import React from 'react';
import './InputMaskItem.css';

type InputMaskItemType = {
  value?: string,
  isError?: boolean,
  isMasked?: boolean,
  isInputActive?: boolean,
  className?: string,
  style?: {[x: string]: any}
}

const activeInputMaskItemGradient = 'linear-gradient(#FFB800 0%, #FFDA7B 31.77%, #FFB800 62.5%, #FFDA7B 100%, #FFDA7B 100%)';

const InputMaskItem: React.FC<InputMaskItemType> = ({ value, isError, isMasked, isInputActive, className, style }) => {
  
  const inputMaskItemWrapperStyles = {
    background: (isInputActive && !isError) ? activeInputMaskItemGradient : isError ? '#FF0000' : '#8400BF',
    filter: (isInputActive && !isError && value) ? 'drop-shadow(0 0 8px #EAA900)' : 'none',
    transition: 'filter .1s ease-in-out',
    borderRadius: '12px',
    boxSizing: 'border-box',
  } as React.CSSProperties;

  const inputMaskItemStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:  isError ? '#9E2121' : '#67219E',
    borderRadius: '8px',
  } as React.CSSProperties;

  const maskedValueStyles = {
    width: '16px',
    height: '16px',
    backgroundColor: '#fff',
    borderRadius: '50%'
  } as React.CSSProperties;

  return (
    <div className={`input-mask-item-wrapper ${className ?? ''}`} style={inputMaskItemWrapperStyles}>
      <div className="input-mask-item" style={{...inputMaskItemStyles, ...style}}>
        { value && isMasked ? 
          <div style={maskedValueStyles}></div>
          : value
        }
      </div>
    </div>
  )
}

export default InputMaskItem;