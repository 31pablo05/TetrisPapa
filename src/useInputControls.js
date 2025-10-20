import { useEffect, useCallback } from 'react';

export const useInputControls = ({
  moveTetromino,
  rotateTetromino,
  dropTetromino,
  hardDrop,
  togglePause,
  isPlaying,
  isGameOver
}) => {
  // Manejar controles de teclado
  const handleKeyPress = useCallback((event) => {
    if (isGameOver) return;

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

  // Configurar event listeners para teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

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