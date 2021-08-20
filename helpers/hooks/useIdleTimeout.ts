import { isServerSide } from 'helpers/isServerSide';
import { useCallback, useEffect } from 'react';

export function useIdleTimeOut(timeout: number, onTimeOut: () => void, onActivity: () => void) {
  const fireOnTimeOut = useCallback(() => {
    if (typeof onTimeOut === 'function' && !isServerSide()) {
      onTimeOut();
    }
  }, [onTimeOut]);

  const fireOnActivity = useCallback(() => {
    if (typeof onActivity === 'function' && !isServerSide()) {
      onActivity();
    }
  }, [onActivity]);

  useEffect(() => {
    if (typeof timeout !== 'undefined' && !isServerSide()) {
      let timerId: number;

      const setTimeout = () => {
        timerId = window.setTimeout(fireOnTimeOut, timeout);
      };

      const clearTimeout = () => {
        if (timerId) {
          window.clearTimeout(timerId);
        }
      };

      const resetTimeout = () => {
        clearTimeout();
        setTimeout();
      };

      const events = [
        'load',
        'mousemove',
        'mousedown',
        'click',
        'scroll',
        'touchcancel',
        'touchend',
        'touchmove',
        'touchstart',
      ];

      events.forEach((e) => {
        window.addEventListener(e, resetTimeout);
        window.addEventListener(e, fireOnActivity);
      });

      setTimeout();
      return () => {
        events.forEach((e) => {
          window.removeEventListener(e, resetTimeout);
          window.removeEventListener(e, fireOnActivity);
        });
        clearTimeout();
      };
    }
  }, [fireOnTimeOut, timeout, fireOnActivity]);
}
