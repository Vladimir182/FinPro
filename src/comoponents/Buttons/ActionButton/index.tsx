import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

type ActionButton = {
  title: string,
  image: string,
  handleButtonClick: () => void,
  link?: string,
  width?: string,
  height?: string,
  style?: { [x: string]: any },
  className?: string
}

const ActionButton: React.FC<ActionButton> = ({ title, link, image, handleButtonClick, width, height, style, className }) => {

  const buttonBlockStyles = {
    border: '7px solid #EAA900',
    filter: 'drop-shadow(0px 0px 5px #EAA900)',
    WebkitFlter: 'drop-shadow(0px 0px 5px #EAA900)'
  } as React.CSSProperties;

  const buttonWrapperStyles = {
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(112deg, #8a00c9 0%, #61088a 33%, #61088a 60%, #8a00c9 100%)',
    color: '#fff'
  }

  if (width) {
    //@ts-ignore
    buttonWrapperStyles.width = width;
  }
  if (height) {
    //@ts-ignore
    buttonWrapperStyles.height = height;
  }

  const linkStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    'text-align': 'center',
  }

  const imageStyles = {}

  const titleStyles = {
    margin: '0px',
    fontWeight: 'bolder',
    textTransform: 'uppercase'
  } as React.CSSProperties;

  return (
    <div className={`action-button-block`} style={{...buttonBlockStyles, ...style}}>
      <div className={`action-button-wrapper ${className ?? ''}`} style={buttonWrapperStyles}>
        {
          link ? (
            <NavLink to={link} style={linkStyles} onClick={handleButtonClick}>
              <p className="action-button-title" style={titleStyles}>{title}</p>
              <img src={image} style={imageStyles} alt="image" />
            </NavLink>
          ) : (
            <div style={linkStyles} onClick={handleButtonClick}>
              <p className="action-button-title" style={titleStyles}>{title}</p>
              <img className="action-button-image" src={image} style={imageStyles} alt="image" />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ActionButton;