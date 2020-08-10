import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback, enable = true) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if(enable){
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [enable, handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [callback, isFetching]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};



export default useInfiniteScroll;
