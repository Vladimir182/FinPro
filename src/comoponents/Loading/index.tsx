import React, { useEffect, CSSProperties, useState } from 'react';
import spinnerInit from './spinner'
import './index.css';

type LoaderProps = {
  style?: {
    [x: string]: string | number
  },
  color?: string
}

const Loader: React.FC<LoaderProps> = ({style}) => {
  const [ isPreloaderRinning, setPreloaderRunning ] = useState(false);

  useEffect(() => {
    if (!isPreloaderRinning) {
      setPreloaderRunning(true)
      spinnerInit(style?.color);
    }
  })
  return (
      <div id="spinnerContainer"
           style={style}
          className="spinner-loader"> 
      </div>
  )
};

export default Loader;