import React, { useState, useEffect } from 'react';
import InputMaskItem from './InputMaskItem';
import './index.css';

type InputMaskType = {
  title: string,
  length: number,
  onInputChange: (value: string) => void,
  padding?: string,
  errorMessage?: string,
  cleanErrorMessage?: () => void,
  style?: { [key: string]: any },
  inputMaskItemStyles?: { [key: string]: any },
  isMasked?: boolean,
}

const inputBlockStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position:'relative',
  background: '#480081',
  boxShadow: '0px 4px 30px rgba(174, 130, 225, 0.2)',
  padding: '7.41vh 3vw 10vh 3vw',
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

const InputMask: React.FC<InputMaskType> = ({ title, length, padding, errorMessage, onInputChange, cleanErrorMessage, style, isMasked, inputMaskItemStyles }) => {
  const [ inputValue, setInputValue ] = useState('');
  const [ isInputActive, setInputActive ] = useState(false);
  
  const inputRef = React.createRef<HTMLInputElement>();
  useEffect(() => {
    setInputActive(true);

    inputRef.current?.focus();
    inputRef.current?.addEventListener('focusout', function() {
      setInputActive(false);
    })
  },[])

  const handleBlockClick = () => {
    
    if (cleanErrorMessage) {
      cleanErrorMessage();
    }

    setInputActive(true);
    inputRef.current?.focus();
  }

  const handleChangeInputValue = (value: string) => {
    if (value.length > length) {
      return;
    }

    setInputValue(value);
    onInputChange(value);
  }

  return (
    <div className="input-block" onClick={handleBlockClick} style={{ ...inputBlockStyles, ...style }}>
      <p className="input-title" style={titleStyles}>{title}</p>
        <label htmlFor="voucher" style={labelStyles}>
          <div className="input-mask" style={inputMaskStyles}>
            {Array(length).fill("").map((item, index) => {
              const value = inputValue[index] ?? '';

              return <InputMaskItem key={index} value={value} isInputActive={isInputActive} isError={!!errorMessage} isMasked={isMasked} style={inputMaskItemStyles}/>
            })}
          </div>
          <input id="voucher" ref={inputRef} style={inputStyles} value={inputValue} onChange={e => handleChangeInputValue(e.target.value)}/>
        </label>
      <p className="input-mask-error" style={inputMaskErrorStyles}>{errorMessage}</p>
    </div>
  )
}

export default InputMask;