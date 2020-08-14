import React from 'react';
import './index.css';

type LoaderProps = {
  style?: {
    [x: string]: string | number
  }
}

const Loader: React.FC<LoaderProps> = ({ style }) => (
  <span className="spinner-loader" style={style}></span>
);

export default Loader;