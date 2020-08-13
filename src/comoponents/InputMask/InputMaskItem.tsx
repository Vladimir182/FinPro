import React from 'react';
import './InputMaskItem.css';

type InputMaskItemType = {
  value?: string,
  isError?: boolean,
  isMasked?: boolean
}

const InputMaskItem: React.FC<InputMaskItemType> = ({ value, isError, isMasked }) => {

  const inputMaskItemWrapperStyles = {
    background: '#540088',
    borderColor: isError ? '#FF0000' : '#8400BF',
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
    <div className="input-mask-item-wrapper" style={inputMaskItemWrapperStyles}>
      <div className="input-mask-item" style={inputMaskItemStyles}>
        { value && isMasked ? 
          <div style={maskedValueStyles}></div>
          : value
        }
      </div>
    </div>
  )
}

export default InputMaskItem;