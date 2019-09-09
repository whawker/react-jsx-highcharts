import { useEffect, useRef } from 'react';


export default function useDelay (callback) {
  const delayTimeout = useRef(null);
  const unmounted = useRef(false);

  useEffect(() => {
    delayTimeout.current = window.requestAnimationFrame(() => {
      if (unmounted.current === false) {
        callback();
      }
      delayTimeout.current = null;
    });
    return () => {
      unmounted.current = true;
      if(delayTimeout.current !== null) {
        window.cancelAnimationFrame(delayTimeout.current);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
