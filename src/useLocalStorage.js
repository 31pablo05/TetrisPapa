import { useState } from 'react';

// Hook personalizado para manejar localStorage
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [value, setStoredValue];
};

// Hook específico para el mejor puntaje del Tetris
export const useBestScore = () => {
  const [bestScore, setBestScore] = useLocalStorage('tetris-best-score', 0);
  const [bestLevel, setBestLevel] = useLocalStorage('tetris-best-level', 1);
  const [bestLines, setBestLines] = useLocalStorage('tetris-best-lines', 0);

  const updateBestScore = (score, level, lines) => {
    if (score > bestScore) {
      setBestScore(score);
      setBestLevel(level);
      setBestLines(lines);
      return true; // Indica que se batió un récord
    }
    return false;
  };

  const resetBestScore = () => {
    setBestScore(0);
    setBestLevel(1);
    setBestLines(0);
  };

  return {
    bestScore,
    bestLevel,
    bestLines,
    updateBestScore,
    resetBestScore
  };
};