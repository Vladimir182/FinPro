import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css'

type BaseButtonProps = {
  title: string,
  image: string,
  link?: string
  width?: string,
  className?: string,
  style?: {
    [x: string]: string | number
  },
  onClick?: () => void
}

const BaseButton: React.FC<BaseButtonProps> = ({ link, title, image, width, style, className,onClick }) => {

  const buttonBlockStyles = {
    width: width ? width : 'auto',
    borderRadius: '30px',
    border: '7px solid #EAA900',
    padding: '13px',
    // filter: 'drop-shadow(0px 0px 5px #EAA900)',
    // WebkitFlter: 'drop-shadow(0px 0px 5px #EAA900)',
    boxShadow: '0px 0px 17px #EAA900',
    background: 'linear-gradient(180deg, rgba(64, 0, 93, 0) 0%, #7400A8 100%)'
  } as React.CSSProperties;

  const buttonWrapperStyles = {
    height: 'calc(100%-13px)',
    borderRadius: '14px',
    // background: 'linear-gradient(112deg, #8a00c9 0%, #61088a 33%, #61088a 60%, #8a00c9 100%)',
    background: 'linear-gradient(180deg, rgba(64, 0, 93, 0) 0%, #8A00C9 98.96%, #8A00C9 100%)'
  } as React.CSSProperties;

  const linkStyles = {
    display: 'block',
    textAlign: 'center',
  } as React.CSSProperties;

  const imageStyles = {
  } as React.CSSProperties;

  const titleStyles = {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#fff'
  } as React.CSSProperties;

  return (
    <>
    { link
      ? (
        <NavLink to={link} style={linkStyles}>
          <div className={`base-button-block ${className}`} 
            onClick={onClick} 
            style={{ ...buttonBlockStyles, ...style }}
          >
            <div className="base-button-wrapper" style={buttonWrapperStyles}>
              <img className="base-button-image" src={image} style={imageStyles} alt="image"/>
              <p className="base-button-title" style={titleStyles}>{title}</p>
            </div>
          </div>
        </NavLink>
      ) : (
        <div className={`base-button-block ${className}`} onClick={onClick} style={{ ...buttonBlockStyles, ...style }}>
          <div className="base-button-wrapper" style={buttonWrapperStyles}>
            <div style={linkStyles}>
              <img className="base-button-image" src={image} style={imageStyles} alt="image"/>
              <p className="base-button-title" style={titleStyles}>{title}</p>
            </div>
          </div>
        </div>
      )
    }
    </>
  )
}

export default BaseButton; 