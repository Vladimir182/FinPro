import React from 'react';
import Loader from './index';
import './index.css'

const LoaderModal: React.FC = () => {

  const preloaderModalStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.7)',
    color: 'var(--main-preloader-color)',
    zIndex: 99,
  } as React.CSSProperties;

  const preloaderWrapperStyles = {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column'
  } as React.CSSProperties;
  
  return (
    <div className="preloader-modal" style={preloaderModalStyles}>
      <div className="preloader-wrapper" style={preloaderWrapperStyles}>
        <div style={{position: 'absolute', left: '50px', top: '-50px'}}>
        <Loader style={{ zIndex: 100, color: '#fff' }} />
        </div>
        <p>Подождите...</p>
      </div>
    </div>
  )
}

export default LoaderModal;