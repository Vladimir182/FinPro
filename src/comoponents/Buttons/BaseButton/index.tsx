import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css'

type BaseButtonProps = {
  link: string
  title: string,
  image: string,
  width?: string,
  className?: string,
  style?: {
    [x: string]: string | number
  }
}

const BaseButton: React.FC<BaseButtonProps> = ({ link, title, image, width, style, className }) => {

  const buttonBlockStyles = {
    width: width ? width : 'auto',
    borderRadius: '14px',
    boxShadow: '0px 0px 1px 8px #EAA900',
    webkitBoxShadow: '0px 0px 1px 8px #EAA900',
    filter: 'drop-shadow(0px 0px 5px #EAA900)',
    WebkitFlter: 'drop-shadow(0px 0px 5px #EAA900)',
    marginRight: '5vw'
  } as React.CSSProperties;

  const buttonWrapperStyles = {
    height: 'calc(100%-13px)',
    borderRadius: '14px',
    margin: '13px',
    background: 'linear-gradient(112deg, #8a00c9 0%, #61088a 33%, #61088a 60%, #8a00c9 100%)',
    paddingBottom: '2.5vw',
    paddingTop: '2.8vw',
  } as React.CSSProperties;

  const linkStyles = {
    display: 'block',
    'text-align': 'center',
  } as React.CSSProperties;

  const imageStyles = {
    width: '8vw',
    marginBottom: "8%"
  } as React.CSSProperties;

  const titleStyles = {
    margin: 0,
    fontSize: '1.8vw',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  } as React.CSSProperties;

  return (
    <div className={`button-block ${className}`} style={{ ...buttonBlockStyles, ...style }}>
      <div className="button-wrapper" style={buttonWrapperStyles}>
        <NavLink to={link} style={linkStyles}>
          <img src={image} style={imageStyles} alt="image"/>
          <p className="base-button-title" style={titleStyles}>{title}</p>
        </NavLink>
      </div>
    </div>
  )
}

export default BaseButton; 