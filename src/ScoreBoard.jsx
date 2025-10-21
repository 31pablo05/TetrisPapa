import React from 'react';

const NextPieceDisplay = ({ nextTetromino }) => {
  if (!nextTetromino) return null;

  return (
    <div className="bg-gray-800/70 rounded-lg p-3 border border-gray-600/30">
      <h3 className="text-white text-sm font-semibold mb-2 text-center">Siguiente</h3>
      <div className="flex justify-center">
        <div 
          className="grid gap-[1px] bg-gray-700/50 p-2 rounded"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(4, 1fr)',
          }}
        >
          {nextTetromino.shape.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-3 h-3 rounded-sm
                  ${cell 
                    ? `${nextTetromino.color} ${nextTetromino.glowColor} shadow-sm border border-white/20` 
                    : 'bg-transparent'
                  }
                `}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ScoreBoard = ({ score, level, lines, nextTetromino, isPlaying, isGameOver, bestScore, bestLevel, bestLines, resetBestScore }) => {
  // Calcular progreso hacia el siguiente nivel
  const getProgressToNextLevel = (currentLines, currentLevel) => {
    const getLinesForLevel = (lvl) => {
      if (lvl === 1) return 0;
      if (lvl === 2) return 10;
      if (lvl === 3) return 25;
      if (lvl === 4) return 45;
      if (lvl === 5) return 70;
      if (lvl === 6) return 100;
      return 100 + (lvl - 6) * 35;
    };

    const currentLevelStart = getLinesForLevel(currentLevel);
    const nextLevelStart = getLinesForLevel(currentLevel + 1);
    const linesInLevel = currentLines - currentLevelStart;
    const linesNeeded = nextLevelStart - currentLevelStart;
    const remaining = nextLevelStart - currentLines;

    return {
      progress: linesInLevel,
      needed: linesNeeded,
      remaining: remaining > 0 ? remaining : 0,
      percentage: Math.min(100, (linesInLevel / linesNeeded) * 100)
    };
  };

  const levelProgress = getProgressToNextLevel(lines, level);

  return (
    <div className="scoreboard space-y-4">
      {/* Información de puntuación - Compacto en móvil */}
      <div className="grid grid-cols-3 md:grid-cols-1 gap-1 md:gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg p-2 md:p-3 border border-blue-500/30">
          <div className="text-blue-300 text-xs font-medium mb-1">PUNTOS</div>
          <div className="text-white text-sm md:text-lg font-bold">{score.toLocaleString()}</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg p-2 md:p-3 border border-purple-500/30">
          <div className="text-purple-300 text-xs font-medium mb-1">NIVEL</div>
          <div className="text-white text-sm md:text-lg font-bold">{level}</div>
          {levelProgress.remaining > 0 && (
            <div className="text-xs text-purple-300 mt-1 hidden md:block">
              -{levelProgress.remaining} líneas
            </div>
          )}
        </div>
        
        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-lg p-2 md:p-3 border border-green-500/30">
          <div className="text-green-300 text-xs font-medium mb-1">LÍNEAS</div>
          <div className="text-white text-sm md:text-lg font-bold">{lines}</div>
        </div>
      </div>

      {/* Barra de progreso del nivel */}
      {levelProgress.remaining > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600/30">
          <div className="text-gray-300 text-xs mb-2">Progreso del Nivel {level}</div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${levelProgress.percentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-400 mt-1 text-center">
            {levelProgress.progress}/{levelProgress.needed} líneas
          </div>
        </div>
      )}

      {/* Mejor Puntaje */}
      {bestScore > 0 && (
        <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-lg p-3 border border-yellow-500/30">
          <h3 className="text-yellow-300 text-xs font-semibold mb-2 text-center">🏆 RÉCORD PERSONAL</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-yellow-200 text-xs">Puntos</div>
              <div className="text-white text-sm font-bold">{bestScore.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-yellow-200 text-xs">Nivel</div>
              <div className="text-white text-sm font-bold">{bestLevel}</div>
            </div>
            <div>
              <div className="text-yellow-200 text-xs">Líneas</div>
              <div className="text-white text-sm font-bold">{bestLines}</div>
            </div>
          </div>
          <button
            onClick={resetBestScore}
            className="mt-2 w-full text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            Resetear récord
          </button>
        </div>
      )}

      {/* Siguiente pieza */}
      <NextPieceDisplay nextTetromino={nextTetromino} />

      {/* Estado del juego */}
      <div className="text-center">
        {isGameOver && (
          <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-3">
            <div className="text-red-400 font-semibold text-sm">¡JUEGO TERMINADO!</div>
          </div>
        )}
        
        {!isPlaying && !isGameOver && (
          <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-3">
            <div className="text-yellow-400 font-semibold text-sm">PAUSADO</div>
          </div>
        )}
        
        {isPlaying && !isGameOver && (
          <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-3">
            <div className="text-green-400 font-semibold text-sm">JUGANDO</div>
          </div>
        )}
      </div>

      {/* Instrucciones de teclado (solo visible en desktop) */}
      <div className="hidden sm:block bg-gray-800/50 rounded-lg p-3 border border-gray-600/30">
        <h3 className="text-white text-sm font-semibold mb-2">Controles</h3>
        <div className="text-gray-300 text-xs space-y-1">
          <div>← → Mover</div>
          <div>↓ Bajar</div>
          <div>↑ / Espacio: Rotar</div>
          <div>Enter: Caída rápida</div>
          <div>P: Pausa</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;