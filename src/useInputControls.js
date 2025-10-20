import { useEffect, useCallback, useRef } from 'react';

export const useInputControls = ({
  moveTetromino,
  rotateTetromino,
  dropTetromino,
  hardDrop,
  togglePause,
  isPlaying,
  isGameOver
}) => {
  const keysPressed = useRef(new Set());
  const intervalRef = useRef(null);

  // Manejar teclas presionadas
  const handleKeyDown = useCallback((event) => {
    if (isGameOver || event.repeat) return;
    
    keysPressed.current.add(event.code);

    switch (event.code) {
      case 'ArrowLeft':
        event.preventDefault();
        moveTetromino(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        moveTetromino(1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        dropTetromino();
        break;
      case 'ArrowUp':
      case 'Space':
        event.preventDefault();
        rotateTetromino();
        break;
      case 'KeyP':
        event.preventDefault();
        togglePause();
        break;
      case 'Enter':
        event.preventDefault();
        hardDrop();
        break;
      default:
        break;
    }
  }, [moveTetromino, rotateTetromino, dropTetromino, hardDrop, togglePause, isGameOver]);

  // Manejar teclas liberadas
  const handleKeyUp = useCallback((event) => {
    keysPressed.current.delete(event.code);
  }, []);

  // Movimiento continuo para flechas horizontales
  useEffect(() => {
    if (!isPlaying || isGameOver) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      if (keysPressed.current.has('ArrowLeft')) {
        moveTetromino(-1);
      } else if (keysPressed.current.has('ArrowRight')) {
        moveTetromino(1);
      } else if (keysPressed.current.has('ArrowDown')) {
        dropTetromino();
      }
    }, 150); // Movimiento continuo cada 150ms

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isGameOver, moveTetromino, dropTetromino]);

  // Configurar event listeners para teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [handleKeyDown, handleKeyUp]);

  // Funciones para controles táctiles (botones en pantalla)
  const touchControls = {
    moveLeft: () => {
      if (!isGameOver && isPlaying) {
        moveTetromino(-1);
      }
    },
    
    moveRight: () => {
      if (!isGameOver && isPlaying) {
        moveTetromino(1);
      }
    },
    
    moveDown: () => {
      if (!isGameOver && isPlaying) {
        dropTetromino();
      }
    },
    
    rotate: () => {
      if (!isGameOver && isPlaying) {
        rotateTetromino();
      }
    },
    
    hardDrop: () => {
      if (!isGameOver && isPlaying) {
        hardDrop();
      }
    },
    
    pause: () => {
      if (!isGameOver) {
        togglePause();
      }
    }
  };

  return {
    touchControls
  };
};