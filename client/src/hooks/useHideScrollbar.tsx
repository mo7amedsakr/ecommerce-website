import { useEffect } from 'react';

export const useHideScrollbar = () => {
  useEffect(() => {
    const body = document.querySelector('body')!;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = '';
    };
  }, []);
};
