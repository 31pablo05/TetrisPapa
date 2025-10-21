import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  BOARD_WIDTH, 
  BOARD_HEIGHT, 
  INITIAL_DROP_TIME,
  getRandomTetromino, 
  rotateTetromino,
  TETROMINO_SHAPES 
} from './tetrominoShapes';
import { useBestScore } from './useLocalStorage';

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
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const lastActionRef = useRef(0);
  const LOCK_WINDOW_MS = 300; // ms during which recent player action prevents immediate lock

  // Hook para manejar el mejor puntaje
  const { bestScore, bestLevel, bestLines, updateBestScore, resetBestScore } = useBestScore();

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
    setDropTime(800); // Velocidad inicial mejorada (ms per drop)
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
      // Si la acción del jugador fue reciente, darle una ventana para seguir moviendo/rotando
      if (Date.now() - lastActionRef.current < LOCK_WINDOW_MS) {
        return; // no bloquear aún
      }

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
          
          // Sistema de niveles mejorado - progresión más equilibrada
          // Nivel 1: 0-9 líneas (10 líneas para pasar)
          // Nivel 2: 10-24 líneas (15 líneas para pasar) 
          // Nivel 3: 25-44 líneas (20 líneas para pasar)
          // Y así sucesivamente...
          const calculateLevel = (totalLines) => {
            if (totalLines < 10) return 1;
            if (totalLines < 25) return 2;
            if (totalLines < 45) return 3;
            if (totalLines < 70) return 4;
            if (totalLines < 100) return 5;
            // Para niveles superiores: cada 35 líneas adicionales
            return 6 + Math.floor((totalLines - 100) / 35);
          };
          
          const newLevel = calculateLevel(newLines);
          
          if (newLevel > level) {
            setLevel(newLevel);
            
            // Velocidad progresiva más equilibrada
            // Nivel 1: 800ms, Nivel 2: 650ms, Nivel 3: 500ms, etc.
            const calculateDropTime = (lvl) => {
              if (lvl <= 1) return 800;
              if (lvl <= 3) return 800 - (lvl - 1) * 150;  // 800, 650, 500
              if (lvl <= 6) return 500 - (lvl - 3) * 80;   // 420, 340, 260
              if (lvl <= 10) return 260 - (lvl - 6) * 40;  // 220, 180, 140, 100
              return Math.max(50, 100 - (lvl - 10) * 10);  // mínimo 50ms
            };
            
            setDropTime(calculateDropTime(newLevel));
            
            // Mostrar notificación de nivel
            setShowLevelUp(true);
            setTimeout(() => setShowLevelUp(false), 2500);
          }
          
          return newLines;
        });
      }
      
      // Verificar Game Over
      if (currentTetromino.y <= 0) {
        setIsGameOver(true);
        setIsPlaying(false);
        
        // Verificar si se batió un récord
        const isRecord = updateBestScore(score, level, lines);
        setIsNewRecord(isRecord);
        
        return;
      }
      
      // Generar nueva pieza
      setCurrentTetromino(nextTetromino);
      setNextTetromino(getRandomTetromino());
    }
  }, [board, currentTetromino, isGameOver, isPlaying, level, nextTetromino, lines, score, updateBestScore]);

  // Keep a ref to the latest dropTetromino so intervals/loops call the up-to-date function
  const dropRef = useRef(dropTetromino);
  useEffect(() => {
    dropRef.current = dropTetromino;
  }, [dropTetromino]);

  // Mover pieza horizontalmente
  const moveTetromino = useCallback((direction) => {
    if (isGameOver || !isPlaying) return;

    setCurrentTetromino(prev => {
      if (!prev) return prev;
      const newX = prev.x + direction;
      if (isValidMove(board, prev, newX, prev.y)) {
        lastActionRef.current = Date.now();
        return { ...prev, x: newX };
      }
      return prev;
    });
  }, [board, isGameOver, isPlaying]);

  // Rotar pieza
  const rotateTetromino_func = useCallback(() => {
    if (isGameOver || !isPlaying) return;

    setCurrentTetromino(prev => {
      if (!prev) return prev;
      const rotated = rotateTetromino(prev);
      if (isValidMove(board, prev, prev.x, prev.y, rotated.shape)) {
        lastActionRef.current = Date.now();
        return rotated;
      }
      return prev;
    });
  }, [board, isGameOver, isPlaying]);

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



  // Game loop automático con timer independiente
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const id = setInterval(() => {
      // call the latest drop function saved in ref to avoid stale closures
      if (dropRef.current) dropRef.current();
    }, dropTime);

    return () => clearInterval(id);
  }, [isPlaying, isGameOver, dropTime]);

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
    isNewRecord,
    
    // Mejor puntaje
    bestScore,
    bestLevel,
    bestLines,
    resetBestScore,
    
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