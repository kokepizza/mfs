import { useState, useEffect } from 'react';

export default function useCurrentPath() {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    const path = window.location.pathname;
    const cleanPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
    setCurrentPath(cleanPath);
  }, []);

  return currentPath;
}