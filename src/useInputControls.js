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

    // Prevent default touch behavior on controls to avoid interference
    const preventControlsDefault = (e) => {
      if (e?.target && (e.target.closest('.controls-container') || e.target.closest('button'))) {
        // Don't prevent the event, just ensure touch-action manipulation works
        return;
      }
    };

    // Only add touch prevention to the game board area
    const gameBoard = document.querySelector('.game-board');
    if (gameBoard) {
      gameBoard.addEventListener('touchstart', preventGameBoardScroll, { passive: false });
      gameBoard.addEventListener('touchmove', preventGameBoardScroll, { passive: false });
    }

    // Add touch handling for better mobile experience
    document.addEventListener('touchstart', preventControlsDefault, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', preventControlsDefault);
      if (gameBoard) {
        gameBoard.removeEventListener('touchstart', preventGameBoardScroll);
        gameBoard.removeEventListener('touchmove', preventGameBoardScroll);
      }
    };
  }, [handleKeyDown]);

  // Funciones para controles táctiles (botones en pantalla) con debounce para evitar múltiples activaciones
  const touchControls = {
    moveLeft: useCallback(() => {
      if (!isGameOver && isPlaying) {
        moveTetromino(-1);
      }
    }, [isGameOver, isPlaying, moveTetromino]),
    
    moveRight: useCallback(() => {
      if (!isGameOver && isPlaying) {
        moveTetromino(1);
      }
    }, [isGameOver, isPlaying, moveTetromino]),
    
    moveDown: useCallback(() => {
      if (!isGameOver && isPlaying) {
        dropTetromino();
      }
    }, [isGameOver, isPlaying, dropTetromino]),
    
    rotate: useCallback(() => {
      if (!isGameOver && isPlaying) {
        rotateTetromino();
      }
    }, [isGameOver, isPlaying, rotateTetromino]),
    
    hardDrop: useCallback(() => {
      if (!isGameOver && isPlaying) {
        hardDrop();
      }
    }, [isGameOver, isPlaying, hardDrop]),
    
    pause: useCallback(() => {
      if (!isGameOver) {
        togglePause();
      }
    }, [isGameOver, togglePause])
  };

  return {
    touchControls
  };
};