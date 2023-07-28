import React, { useState, useEffect } from 'react';

const getOnlyShortMovies = () => {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}

export const useOnlyShortMovies = () => {
  const [onlyShortMovies, setOnlyShortMovies] = useState(getOnlyShortMovies());

  useEffect(() => {
    function handleResize() {
      setOnlyShortMovies(getOnlyShortMovies());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return onlyShortMovies;
}