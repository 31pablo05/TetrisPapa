import { useState, useCallback, useEffect } from 'react';
import { 
  BOARD_WIDTH, 
  BOARD_HEIGHT, 
  INITIAL_DROP_TIME,
  getRandomTetromino, 
  rotateTetromino,
  TETROMINO_SHAPES 
} from './tetrominoShapes';

// Función para crear un tablero vacío
const createEmptyBoard = () => {
  return Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(null));
};

// Función para verificar si una posición es válida
const isValidMove = (board, tetromino, newX, newY, newShape = null) => {
  const shape = newShape || tetromino.shape;
  
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const boardX = newX + x;
        const boardY = newY + y;
        
        // Verificar límites del tablero
        if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
          return false;
        }
        
        // Verificar colisión con piezas existentes (solo si no estamos arriba del tablero)
        if (boardY >= 0 && board[boardY][boardX]) {
          return false;
        }
      }
    }
  }
  return true;
};

// Función para colocar una pieza en el tablero
const placeTetromino = (board, tetromino) => {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x] && tetromino.y + y >= 0) {
        newBoard[tetromino.y + y][tetromino.x + x] = {
          color: tetromino.color,
          glowColor: tetromino.glowColor
        };
      }
    }
  }
  
  return newBoard;
};

// Función para eliminar líneas completas
const clearLines = (board) => {
  const newBoard = [];
  let linesCleared = 0;
  
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (board[y].every(cell => cell !== null)) {
      linesCleared++;
    } else {
      newBoard.unshift(board[y]);
    }
  }
  
  // Agregar líneas vacías al principio
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }
  
  return { board: newBoard, linesCleared };
};

// Hook principal para la lógica del Tetris
export const useTetrisLogic = () => {
  const [board, setBoard] = useState(createEmptyBoard);
  const [currentTetromino, setCurrentTetromino] = useState(null);
  const [nextTetromino, setNextTetromino] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dropTime, setDropTime] = useState(INITIAL_DROP_TIME);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Inicializar el juego
  const initializeGame = useCallback(() => {
    const newBoard = createEmptyBoard();
    const firstTetromino = getRandomTetromino();
    const secondTetromino = getRandomTetromino();
    
    setBoard(newBoard);
    setCurrentTetromino(firstTetromino);
    setNextTetromino(secondTetromino);
    setScore(0);
    setLevel(1);
    setLines(0);
    setIsGameOver(false);
    setDropTime(INITIAL_DROP_TIME);
    setGameStartTime(Date.now());
    setShowLevelUp(false);
  }, []);

  // Comenzar el juego
  const startGame = useCallback(() => {
    initializeGame();
    setIsPlaying(true);
  }, [initializeGame]);

  // Pausar/reanudar el juego
  const togglePause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Reiniciar el juego
  const resetGame = useCallback(() => {
    setIsPlaying(false);
    initializeGame();
  }, [initializeGame]);

  // Mover pieza hacia abajo
  const dropTetromino = useCallback(() => {
    if (!currentTetromino || isGameOver || !isPlaying) return;

    const newY = currentTetromino.y + 1;
    
    if (isValidMove(board, currentTetromino, currentTetromino.x, newY)) {
      setCurrentTetromino(prev => ({ ...prev, y: newY }));
    } else {
      // La pieza no puede moverse más, la colocamos en el tablero
      const newBoard = placeTetromino(board, currentTetromino);
      const { board: clearedBoard, linesCleared } = clearLines(newBoard);
      
      setBoard(clearedBoard);
      
      // Actualizar puntuación y estadísticas
      if (linesCleared > 0) {
        const points = linesCleared * 100 * level;
        setScore(prev => prev + points);
        setLines(prev => {
          const newLines = prev + linesCleared;
          
          // Calcular nuevo nivel basado en líneas (cada 10 líneas)
          const newLevel = Math.floor(newLines / 10) + 1;
          if (newLevel > level) {
            setLevel(newLevel);
            const newDropTime = Math.max(100, INITIAL_DROP_TIME - (newLevel - 1) * 80);
            setDropTime(newDropTime);
            
            // Mostrar notificación de nivel
            setShowLevelUp(true);
            setTimeout(() => setShowLevelUp(false), 2000);
          }
          
          return newLines;
        });
      }
      
      // Verificar Game Over
      if (currentTetromino.y <= 0) {
        setIsGameOver(true);
        setIsPlaying(false);
        return;
      }
      
      // Generar nueva pieza
      setCurrentTetromino(nextTetromino);
      setNextTetromino(getRandomTetromino());
    }
  }, [board, currentTetromino, isGameOver, isPlaying, level, nextTetromino]);

  // Mover pieza horizontalmente
  const moveTetromino = useCallback((direction) => {
    if (!currentTetromino || isGameOver || !isPlaying) return;
    
    const newX = currentTetromino.x + direction;
    
    if (isValidMove(board, currentTetromino, newX, currentTetromino.y)) {
      setCurrentTetromino(prev => ({ ...prev, x: newX }));
    }
  }, [board, currentTetromino, isGameOver, isPlaying]);

  // Rotar pieza
  const rotateTetromino_func = useCallback(() => {
    if (!currentTetromino || isGameOver || !isPlaying) return;
    
    const rotatedTetromino = rotateTetromino(currentTetromino);
    
    if (isValidMove(board, currentTetromino, currentTetromino.x, currentTetromino.y, rotatedTetromino.shape)) {
      setCurrentTetromino(rotatedTetromino);
    }
  }, [board, currentTetromino, isGameOver, isPlaying]);

  // Caída rápida
  const hardDrop = useCallback(() => {
    if (!currentTetromino || isGameOver || !isPlaying) return;
    
    let newY = currentTetromino.y;
    while (isValidMove(board, currentTetromino, currentTetromino.x, newY + 1)) {
      newY++;
    }
    
    setCurrentTetromino(prev => ({ ...prev, y: newY }));
    // En el próximo frame se colocará automáticamente
    setTimeout(() => dropTetromino(), 0);
  }, [board, currentTetromino, isGameOver, isPlaying, dropTetromino]);

  // Crear tablero con la pieza actual para renderizado
  const getBoardWithCurrentPiece = useCallback(() => {
    if (!currentTetromino) return board;
    
    const boardWithPiece = board.map(row => [...row]);
    
    for (let y = 0; y < currentTetromino.shape.length; y++) {
      for (let x = 0; x < currentTetromino.shape[y].length; x++) {
        if (currentTetromino.shape[y][x] && currentTetromino.y + y >= 0) {
          const boardY = currentTetromino.y + y;
          const boardX = currentTetromino.x + x;
          if (boardY < BOARD_HEIGHT && boardX < BOARD_WIDTH) {
            boardWithPiece[boardY][boardX] = {
              color: currentTetromino.color,
              glowColor: currentTetromino.glowColor,
              isCurrent: true
            };
          }
        }
      }
    }
    
    return boardWithPiece;
  }, [board, currentTetromino]);

  // Sistema de nivel automático basado en tiempo
  useEffect(() => {
    if (!isPlaying || isGameOver || !gameStartTime) return;

    const levelUpInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeElapsed = currentTime - gameStartTime;
      const minutesElapsed = Math.floor(timeElapsed / 60000); // minutos transcurridos
      
      // Subir nivel cada 2 minutos automáticamente
      const autoLevel = Math.floor(minutesElapsed / 2) + 1;
      
      setLevel(currentLevel => {
        if (autoLevel > currentLevel) {
          const newDropTime = Math.max(50, INITIAL_DROP_TIME - (autoLevel - 1) * 100);
          setDropTime(newDropTime);
          
          // Mostrar notificación de nivel
          setShowLevelUp(true);
          setTimeout(() => setShowLevelUp(false), 2000);
          
          return autoLevel;
        }
        return currentLevel;
      });
    }, 30000); // Verificar cada 30 segundos

    return () => clearInterval(levelUpInterval);
  }, [isPlaying, isGameOver, gameStartTime]);

  // Game loop automático con timer independiente
  useEffect(() => {
    if (!isPlaying || isGameOver || !currentTetromino) {
      return;
    }

    const dropInterval = setInterval(() => {
      dropTetromino();
    }, dropTime);

    return () => {
      clearInterval(dropInterval);
    };
  }, [isPlaying, isGameOver, dropTime, currentTetromino, dropTetromino]);

  // Inicializar el primer juego
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    // Estado del juego
    board: getBoardWithCurrentPiece(),
    nextTetromino,
    score,
    level,
    lines,
    isGameOver,
    isPlaying,
    showLevelUp,
    
    // Acciones
    startGame,
    togglePause,
    resetGame,
    moveTetromino,
    rotateTetromino: rotateTetromino_func,
    dropTetromino,
    hardDrop
  };
};