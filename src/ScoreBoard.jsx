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

const ScoreBoard = ({ score, level, lines, nextTetromino, isPlaying, isGameOver }) => {
  return (
    <div className="scoreboard space-y-4">
      {/* Información de puntuación */}
      <div className="grid grid-cols-3 md:grid-cols-1 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg p-3 border border-blue-500/30">
          <div className="text-blue-300 text-xs font-medium mb-1">PUNTOS</div>
          <div className="text-white text-lg font-bold">{score.toLocaleString()}</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg p-3 border border-purple-500/30">
          <div className="text-purple-300 text-xs font-medium mb-1">NIVEL</div>
          <div className="text-white text-lg font-bold">{level}</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-lg p-3 border border-green-500/30">
          <div className="text-green-300 text-xs font-medium mb-1">LÍNEAS</div>
          <div className="text-white text-lg font-bold">{lines}</div>
        </div>
      </div>

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