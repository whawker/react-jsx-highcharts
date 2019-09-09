import React, { useState } from 'react';
import useDelay from '../UseDelay';

const DelayRender = ({ children }) => {
  const [render, setRender] = useState(false);
  useDelay(()=> {
    if(!render) setRender(true);
  });

  if (!render) return null;

  return children;

}

export default DelayRender;
