import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const [isMatch, setIsMatch] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const listenerHandler = (e: MediaQueryListEvent) => {
      setIsMatch(e.matches);
    };
    mq.addListener(listenerHandler);
    return () => {
      mq.removeListener(listenerHandler);
    };
  }, [query]);
  return isMatch;
};
