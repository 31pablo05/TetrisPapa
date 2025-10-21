import React from 'react';

const GameOverModal = ({ isVisible, score, level, lines, onRestart, onClose }) => {
  if (!isVisible) return null;

  // Función para determinar el mensaje basado en el puntaje
  const getScoreMessage = (score) => {
    if (score >= 50000) return "¡MAESTRO DEL TETRIS!";
    if (score >= 20000) return "¡EXCELENTE JUGADOR!";
    if (score >= 10000) return "¡MUY BIEN!";
    if (score >= 5000) return "¡BUEN TRABAJO!";
    if (score >= 1000) return "¡NO ESTÁ MAL!";
    return "¡SIGUE PRACTICANDO!";
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-600/50 max-w-sm w-full mx-4 transform animate-pulse">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-t-2xl p-4 text-center">
          <h2 className="text-white text-2xl font-bold">GAME OVER</h2>
          <div className="text-red-200 text-sm mt-1">{getScoreMessage(score)}</div>
        </div>

        {/* Estadísticas */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-3 text-center">
              <div className="text-gray-400 text-xs font-medium mb-1">PUNTUACIÓN FINAL</div>
              <div className="text-white text-xl font-bold">{score.toLocaleString()}</div>
            </div>
            
            <div className="bg-gray-700/50 rounded-lg p-3 text-center">
              <div className="text-gray-400 text-xs font-medium mb-1">NIVEL ALCANZADO</div>
              <div className="text-white text-xl font-bold">{level}</div>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-3 text-center">
            <div className="text-gray-400 text-xs font-medium mb-1">LÍNEAS COMPLETADAS</div>
            <div className="text-white text-xl font-bold">{lines}</div>
          </div>

          {/* Ranking simple */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-3 border border-blue-500/30">
            <div className="text-center">
              <div className="text-blue-300 text-sm font-medium mb-2">Tu desempeño</div>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full mx-1 ${
                      i < Math.min(5, Math.floor(score / 5000) + 1)
                        ? 'bg-yellow-400'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <div className="text-gray-400 text-xs mt-1">
                {Math.min(5, Math.floor(score / 5000) + 1)}/5 estrellas
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="p-4 space-y-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRestart();
            }}
            onTouchStart={(e) => e.preventDefault()}
            style={{ 
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-green-500/25 cursor-pointer relative z-30"
          >
            🎮 Jugar de Nuevo
          </button>
          
          {onClose && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              onTouchStart={(e) => e.preventDefault()}
              style={{ 
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent'
              }}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 active:from-gray-800 active:to-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-gray-500/25 cursor-pointer relative z-30"
            >
              Cerrar
            </button>
          )}
        </div>

        {/* Tips para mejorar */}
        <div className="px-4 pb-4">
          <div className="bg-gray-700/30 rounded-lg p-3">
            <div className="text-gray-300 text-xs text-center">
              💡 <strong>Tip:</strong> Completa líneas múltiples para más puntos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;