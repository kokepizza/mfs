// src/components/useCurrentPath.js
import { useState, useEffect } from 'react';

export default function useCurrentPath() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const path = window.location.pathname.replace(/\/$/, '');
    setCurrentPath(path);
  }, []);

  return currentPath;
}