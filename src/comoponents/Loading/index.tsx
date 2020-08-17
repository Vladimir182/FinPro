import React, { useEffect, CSSProperties } from 'react';
import spinnerInit from './spinner'
import './index.css';

type LoaderProps = {
  style?: {
    [x: string]: string | number
  },
  color?: string
}

const Loader: React.FC<LoaderProps> = ({style}) => {
  useEffect(() => {
    spinnerInit(style?.color);
  })
  return (
      <div id="spinnerContainer"
           style={style}
          className="spinner-loader"> 
      </div>
  )
};

export default Loader;