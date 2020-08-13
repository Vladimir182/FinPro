import React, { useState } from 'react';
import InputMaskItem from './InputMaskItem';
import './index.css';

type InputMaskType = {
  title: string,
  length: number,
  onInputChange: (value: string) => void,
  padding?: string,
  errorMessage?: string
}

const inputBlockStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position:'relative',
  background: '#480081',
  boxShadow: '0px 4px 30px rgba(174, 130, 225, 0.2)',
  padding: '7.41vh 4vw 10vh 4vw',
  boxSizing: 'border-box'
} as React.CSSProperties;

const titleStyles = {
  textAlign: 'center',
  fontWeight: 'bolder',
  margin: 0,
  marginBottom: '4.07vh',
  color: '#fff',
  textTransform: 'uppercase'
} as React.CSSProperties;

const labelStyles = {
  display: 'block'
} as React.CSSProperties;

const inputMaskStyles = {
  display: 'flex',
} as React.CSSProperties;

const inputStyles = {
  width: 'auto',
  position: 'absolute',
  left: '-100000px'
} as React.CSSProperties;

const inputMaskErrorStyles = {
  display: 'inline-block',
  position: 'absolute',
  bottom: '3vh',
  fontStyle: 'normal',
  fontWeight: 'normal',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: '#FF0000',
  margin: 0
} as React.CSSProperties;

const InputMask: React.FC<InputMaskType> = ({ title, length, padding, errorMessage, onInputChange  }) => {
  const [ inputValue, setInputValue ] = useState('');

  const handleChangeInputValue = (value: string) => {
    if (value.length > length) {
      return;
    }

    setInputValue(value);
    onInputChange(value);
  }

  return (
    <div className="input-block" style={inputBlockStyles}>
      <p className="input-title" style={titleStyles}>{title}</p>
        <label htmlFor="voucher" style={labelStyles}>
          <div className="input-mask" style={inputMaskStyles}>
            {Array(length).fill("").map((item, index) => {
              const value = inputValue[index] ?? '';

              return <InputMaskItem  value={value} isError={!!errorMessage} />
            })}
          </div>
          <input id="voucher" style={inputStyles} value={inputValue} onChange={e => handleChangeInputValue(e.target.value)}/>
        </label>
        <p className="input-mask-error" style={inputMaskErrorStyles}>{errorMessage}</p>
    </div>
  )
}

export default InputMask;