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
    borderRadius: '14px',
    boxShadow: '0px 0px 1px 8px #EAA900',
    WebkitBoxShadow: '0px 0px 1px 8px #EAA900',
    filter: 'drop-shadow(0px 0px 5px #EAA900)',
    WebkitFlter: 'drop-shadow(0px 0px 5px #EAA900)',
    marginRight: '5vw'
  } as React.CSSProperties;

  const buttonWrapperStyles = {
    height: 'calc(100%-13px)',
    borderRadius: '14px',
    margin: '13px',
    background: 'linear-gradient(112deg, #8a00c9 0%, #61088a 33%, #61088a 60%, #8a00c9 100%)',
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
    <div className={`base-button-block ${className}`} onClick={onClick} style={{ ...buttonBlockStyles, ...style }}>
      <div className="base-button-wrapper" style={buttonWrapperStyles}>
        { link ?
          <NavLink to={link} style={linkStyles}>
            <img className="base-button-image" src={image} style={imageStyles} alt="image"/>
            <p className="base-button-title" style={titleStyles}>{title}</p>
          </NavLink>
          : <div style={linkStyles}>
            <img className="base-button-image" src={image} style={imageStyles} alt="image"/>
            <p className="base-button-title" style={titleStyles}>{title}</p>
          </div>
        }
      </div>
    </div>
  )
}

export default BaseButton; 