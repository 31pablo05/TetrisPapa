import React from 'react';

// Iconos simples usando CSS
const ArrowLeftIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const RotateIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
  </svg>
);

const PauseIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
);

const ControlButton = ({ onClick, children, className = '', disabled = false, variant = 'primary' }) => {
  const baseClasses = "flex items-center justify-center font-semibold rounded-lg transition-all duration-150 active:scale-95 select-none touch-manipulation";
  
  const variants = {
    primary: "bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30",
    secondary: "bg-gradient-to-b from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg shadow-gray-500/25 border border-gray-500/30",
    action: "bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30"
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${disabled ? disabledClasses : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

const Controls = ({ touchControls, isPlaying, isGameOver, startGame, resetGame }) => {
  return (
    <div className="controls-container space-y-4">
      {/* Controles de juego (Start/Pause/Reset) */}
      <div className="flex flex-wrap gap-3 justify-center">
        {!isPlaying && !isGameOver && (
          <ControlButton 
            onClick={startGame} 
            variant="action" 
            className="px-8 py-4 text-lg font-bold w-full md:w-auto min-h-[60px] shadow-xl"
          >
            <PlayIcon />
            <span className="ml-2">🎮 JUGAR</span>
          </ControlButton>
        )}
        
        {isPlaying && !isGameOver && (
          <ControlButton 
            onClick={touchControls.pause} 
            variant="secondary" 
            className="px-4 py-3 text-sm w-full md:w-auto"
          >
            <PauseIcon />
            <span className="ml-2">Pausa</span>
          </ControlButton>
        )}
        
        {(isGameOver || isPlaying) && (
          <ControlButton 
            onClick={resetGame} 
            variant="action" 
            className="px-6 py-3 text-base w-full md:w-auto min-h-[50px]"
          >
            <span>🔄 Reiniciar</span>
          </ControlButton>
        )}
      </div>

      {/* Controles de movimiento (solo visible en móvil cuando se está jugando) */}
      {isPlaying && !isGameOver && (
        <div className="md:hidden">
          {/* Fila superior: Rotar */}
          <div className="flex justify-center mb-4">
            <ControlButton 
              onClick={touchControls.rotate} 
              className="w-16 h-16"
              variant="action"
            >
              <RotateIcon />
            </ControlButton>
          </div>

          {/* Fila media: Izquierda y Derecha */}
          <div className="flex justify-center gap-4 mb-4">
            <ControlButton 
              onClick={touchControls.moveLeft} 
              className="w-16 h-16"
            >
              <ArrowLeftIcon />
            </ControlButton>
            
            <div className="w-16"></div> {/* Espacio en el medio */}
            
            <ControlButton 
              onClick={touchControls.moveRight} 
              className="w-16 h-16"
            >
              <ArrowRightIcon />
            </ControlButton>
          </div>

          {/* Fila inferior: Bajar */}
          <div className="flex justify-center gap-2">
            <ControlButton 
              onClick={touchControls.moveDown} 
              className="w-20 h-12 text-sm"
            >
              <ArrowDownIcon />
              <span className="ml-1">Bajar</span>
            </ControlButton>
            
            <ControlButton 
              onClick={touchControls.hardDrop} 
              className="w-20 h-12 text-sm"
              variant="secondary"
            >
              <ArrowDownIcon />
              <ArrowDownIcon />
            </ControlButton>
          </div>

          {/* Instrucciones para móviles */}
          <div className="text-center mt-4 text-gray-400 text-xs">
            Usa los botones para controlar las piezas
          </div>
        </div>
      )}

      {/* Instrucciones para desktop */}
      <div className="hidden md:block bg-gray-800/50 rounded-lg p-3 border border-gray-600/30">
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

export default Controls;