import React from 'react';
import { useTetrisLogic } from './useTetrisLogic';
import { useInputControls } from './useInputControls';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import Controls from './Controls';
import GameOverModal from './GameOverModal';
import LevelUpNotification from './LevelUpNotification';
import './App.css'

function App() {
  // Hook principal del juego
  const {
    board,
    nextTetromino,
    score,
    level,
    lines,
    isGameOver,
    isPlaying,
    showLevelUp,
    startGame,
    togglePause,
    resetGame,
    moveTetromino,
    rotateTetromino,
    dropTetromino,
    hardDrop
  } = useTetrisLogic();

  // Hook para controles de teclado y táctiles
  const { touchControls } = useInputControls({
    moveTetromino,
    rotateTetromino,
    dropTetromino,
    hardDrop,
    togglePause,
    isPlaying,
    isGameOver
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            TETRIS
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Juego clásico con diseño moderno
          </p>
        </div>

        {/* Layout principal */}
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-6 md:items-start">
          
          {/* Scoreboard - Arriba en móvil, izquierda en desktop */}
          <div className="md:col-span-1 order-1">
            <ScoreBoard
              score={score}
              level={level}
              lines={lines}
              nextTetromino={nextTetromino}
              isPlaying={isPlaying}
              isGameOver={isGameOver}
            />
          </div>

          {/* Contenedor para GameBoard y Controls en móvil */}
          <div className="md:col-span-2 order-2 flex flex-col items-center">
            {/* GameBoard - Centro */}
            <div className="w-full max-w-[280px] md:max-w-md mb-2 md:mb-4">
              <GameBoard 
                board={board} 
                className="w-full aspect-[1/2] shadow-2xl mx-auto"
              />
            </div>
            
            {/* Controls - Justo debajo del GameBoard en móvil */}
            <div className="md:hidden w-full max-w-[280px]">
              <Controls
                touchControls={touchControls}
                isPlaying={isPlaying}
                isGameOver={isGameOver}
                startGame={startGame}
                resetGame={resetGame}
              />
            </div>
          </div>

          {/* Controls - Solo visible en desktop */}
          <div className="hidden md:block md:col-span-1 order-3">
            <Controls
              touchControls={touchControls}
              isPlaying={isPlaying}
              isGameOver={isGameOver}
              startGame={startGame}
              resetGame={resetGame}
            />
          </div>

        </div>

        {/* Footer con padding bottom extra para móvil */}
        <div className="text-center mt-6 pb-8 md:pb-2 text-gray-500 text-xs">
          <p>Hecho con ❤️ usando React + Vite + Tailwind CSS</p>
          <p className="mt-1 hidden md:block">
            Controles: Flechas para mover, Espacio/↑ para rotar, P para pausa
          </p>
        </div>

      </div>

      {/* Modal de Game Over */}
      <GameOverModal
        isVisible={isGameOver}
        score={score}
        level={level}
        lines={lines}
        onRestart={resetGame}
      />

      {/* Notificación de Level Up */}
      <LevelUpNotification
        isVisible={showLevelUp}
        level={level}
      />

    </div>
  );
}

export default App
