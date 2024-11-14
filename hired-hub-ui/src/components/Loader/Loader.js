import React from "react";
import './Loader.scss';

const Loader = ({ size }) => {
  return (
    <div className="spinner" style={{ "--size": `${size}px` }}/>
  );
};

export default Loader;