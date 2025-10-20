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
  // Manejar controles de teclado - SIMPLE, sin interferir con el game loop
  const handleKeyDown = useCallback((event) => {
    if (isGameOver || event.repeat) return;

    switch (event.code) {
      case 'ArrowLeft':
        event.preventDefault();
        if (isPlaying) moveTetromino(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (isPlaying) moveTetromino(1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (isPlaying) dropTetromino();
        break;
      case 'ArrowUp':
      case 'Space':
        event.preventDefault();
        if (isPlaying) rotateTetromino();
        break;
      case 'KeyP':
        event.preventDefault();
        togglePause();
        break;
      case 'Enter':
        event.preventDefault();
        if (isPlaying) hardDrop();
        break;
      default:
        break;
    }
  }, [moveTetromino, rotateTetromino, dropTetromino, hardDrop, togglePause, isPlaying, isGameOver]);

  // Configurar event listeners para teclado
  useEffect(() => {
    // addEventListener with passive: false to allow preventDefault on some browsers
    window.addEventListener('keydown', handleKeyDown, { passive: false });

    // Prevent touch scrolling only on game board, not on the whole page
    const preventGameBoardScroll = (e) => {
      // Only prevent scroll if touching directly the game board
      if (e?.target && e.target.closest('.game-board')) {
        e.preventDefault();
      }
    };

    // Only add touch prevention to the game board area
    const gameBoard = document.querySelector('.game-board');
    if (gameBoard) {
      gameBoard.addEventListener('touchstart', preventGameBoardScroll, { passive: false });
      gameBoard.addEventListener('touchmove', preventGameBoardScroll, { passive: false });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gameBoard) {
        gameBoard.removeEventListener('touchstart', preventGameBoardScroll);
        gameBoard.removeEventListener('touchmove', preventGameBoardScroll);
      }
    };
  }, [handleKeyDown]);

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