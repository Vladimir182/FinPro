import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

type ActionButton = {
  title: string,
  image?: string,
  handleButtonClick?: (event: any) => void,
  link?: string,
  width?: string,
  height?: string,
  style?: { [x: string]: any },
  className?: string,
  disable?: boolean
}

const ActionButton: React.FC<ActionButton> = ({ title, link, image, handleButtonClick, width, height, style, className, disable }) => {

  const buttonBlockStyles = {
    border: `7px solid ${disable ? '#BEBEBE' : '#EAA900'}`,
    // background: 'linear-gradient(180deg, rgba(64, 0, 93, 0) 0%, #7400A8 100%)',
    filter: disable ? '' : 'drop-shadow(0px 0px 5px #EAA900)',
    WebkitFlter: 'drop-shadow(0px 0px 5px #EAA900)'
  } as React.CSSProperties;

  const buttonWrapperStyles = {
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(112deg, #8a00c9 0%, #61088a 33%, #61088a 60%, #8a00c9 100%)',
    // background: 'linear-gradient(180deg, rgba(255, 0, 245, 0) 0%, #9F10E0 100%)',
    // background: 'linear-gradient(180deg, rgba(64, 0, 93, 0) 0%, #8A00C9 98.96%, #8A00C9 100%)',
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
    textAlign: 'center',
  } as React.CSSProperties;

  const imageStyles = {}

  const titleStyles = {
    margin: '0px',
    fontWeight: 'bolder',
    textTransform: 'uppercase'
  } as React.CSSProperties;

  // return (
  //   <div className={`action-button-block`}  onClick={!disable ? handleButtonClick: () => {}} style={{...buttonBlockStyles, ...style}}>
  //     <div className={`action-button-wrapper ${className ?? ''}`} style={buttonWrapperStyles}>
  //       {
  //         link ? (
  //           <NavLink to={link} style={linkStyles}>
  //             <p className="action-button-title" style={titleStyles}>{title}</p>
  //             { image && <img src={image} style={imageStyles} alt="image" /> }
  //           </NavLink>
  //         ) : (
  //           <div style={linkStyles}>
  //             <p className="action-button-title" style={titleStyles}>{title}</p>
  //             { image && <img className="action-button-image" src={image} style={imageStyles} alt="image" /> }
  //           </div>
  //         )
  //       }
  //     </div>
  //   </div>
  // )

  return (
        <>
          {
            link 
            ? <NavLink to={link} style={{ ...style }}>
              <div className={`action-button-block`}  onClick={!disable ? handleButtonClick: () => {}} style={{...buttonBlockStyles}}>
                <div className={`action-button-wrapper ${className ?? ''}`} style={{  ...buttonWrapperStyles, ...linkStyles }}>
                        <p className="action-button-title" style={titleStyles}>{title}</p>
                        { image && <img src={image} style={imageStyles} alt="image" /> }
                </div>
              </div>
          </NavLink>
          : <div className={`action-button-block`}  onClick={!disable ? handleButtonClick: () => {}} style={{...buttonBlockStyles, ...style}}>
              <div className={`action-button-wrapper ${className ?? ''}`} style={buttonWrapperStyles}>
                <div style={linkStyles}>
                  <p className="action-button-title" style={titleStyles}>{title}</p>
                  { image && <img className="action-button-image" src={image} style={imageStyles} alt="image" /> }
                </div>
              </div>
            </div>
          }
        </>
  )
}

export default ActionButton;