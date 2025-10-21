import React, { useRef, useState } from 'react';

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

const ControlButton = ({ onClick, children, className = '', disabled = false, variant = 'primary', size = 'normal' }) => {
  const touchedRef = useRef(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const baseClasses = "flex items-center justify-center font-bold rounded-xl transition-all duration-100 select-none relative overflow-hidden";
  
  const variants = {
    primary: `
      bg-gradient-to-b from-blue-500 to-blue-700 
      hover:from-blue-400 hover:to-blue-600 
      text-white shadow-xl shadow-blue-500/40 
      border-2 border-blue-400/50
      ${isPressed ? 'scale-95 shadow-lg shadow-blue-500/60' : 'shadow-xl'}
    `,
    secondary: `
      bg-gradient-to-b from-gray-500 to-gray-700 
      hover:from-gray-400 hover:to-gray-600 
      text-white shadow-xl shadow-gray-500/40 
      border-2 border-gray-400/50
      ${isPressed ? 'scale-95 shadow-lg shadow-gray-500/60' : 'shadow-xl'}
    `,
    action: `
      bg-gradient-to-b from-purple-500 to-purple-700 
      hover:from-purple-400 hover:to-purple-600 
      text-white shadow-xl shadow-purple-500/40 
      border-2 border-purple-400/50
      ${isPressed ? 'scale-95 shadow-lg shadow-purple-500/60' : 'shadow-xl'}
    `,
    rotate: `
      bg-gradient-to-b from-orange-500 to-orange-700 
      hover:from-orange-400 hover:to-orange-600 
      text-white shadow-xl shadow-orange-500/40 
      border-2 border-orange-400/50
      ${isPressed ? 'scale-95 shadow-lg shadow-orange-500/60' : 'shadow-xl'}
    `,
    drop: `
      bg-gradient-to-b from-red-500 to-red-700 
      hover:from-red-400 hover:to-red-600 
      text-white shadow-xl shadow-red-500/40 
      border-2 border-red-400/50
      ${isPressed ? 'scale-95 shadow-lg shadow-red-500/60' : 'shadow-xl'}
    `
  };

  const sizes = {
    normal: "min-h-[60px] min-w-[60px]",
    large: "min-h-[80px] min-w-[80px]",
    wide: "min-h-[60px] min-w-[120px]",
    extraWide: "min-h-[70px] min-w-[140px]"
  };

  const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

  const handleTouchStart = (e) => {
    if (e && e.cancelable) e.preventDefault();
    touchedRef.current = true;
    setIsPressed(true);
    if (!disabled && onClick) onClick();
    
    // Reset press state after animation
    setTimeout(() => setIsPressed(false), 150);
  };

  const handleTouchEnd = (e) => {
    if (e && e.cancelable) e.preventDefault();
    setTimeout(() => setIsPressed(false), 100);
  };

  const handleMouseDown = () => {
    if (!touchedRef.current) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    if (touchedRef.current) {
      touchedRef.current = false;
      return;
    }
    if (!disabled && onClick) onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      disabled={disabled}
      style={{ 
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent'
      }}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? disabledClasses : ''}
        ${className}
      `}
    >
      {/* Efecto de brillo al presionar */}
      <div className={`absolute inset-0 bg-white/20 transition-opacity duration-100 ${isPressed ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </button>
  );
};

const Controls = ({ touchControls, isPlaying, isGameOver, startGame, resetGame }) => {
  // Debug function for mobile testing
  const handleStartGameDebug = () => {
    console.log('Start Game clicked!', { isPlaying, isGameOver });
    if (startGame && typeof startGame === 'function') {
      startGame();
    } else {
      console.error('startGame is not a function:', startGame);
    }
  };

  return (
    <div className="controls-container space-y-3">
      
      {/* PRIMERO: Controles de movimiento (solo visible en móvil cuando se está jugando) */}
      {isPlaying && !isGameOver && (
        <div className="md:hidden bg-gradient-to-b from-gray-900/90 to-gray-800/90 rounded-t-none rounded-b-2xl p-3 border-2 border-t-0 border-gray-600/50 backdrop-blur-sm shadow-2xl">
          {/* Fila 1: Controles direccionales - Compactos */}
          <div className="flex justify-between items-center mb-3 px-2">
            <ControlButton 
              onClick={touchControls.moveLeft} 
              className="cursor-pointer"
              variant="primary"
              size="normal"
            >
              <div className="flex flex-col items-center">
                <ArrowLeftIcon />
                <span className="text-xs font-bold">←</span>
              </div>
            </ControlButton>
            
            <ControlButton 
              onClick={touchControls.moveDown} 
              className="cursor-pointer"
              variant="primary"
              size="normal"
            >
              <div className="flex flex-col items-center">
                <ArrowDownIcon />
                <span className="text-xs font-bold">↓</span>
              </div>
            </ControlButton>
            
            <ControlButton 
              onClick={touchControls.moveRight} 
              className="cursor-pointer"
              variant="primary"
              size="normal"
            >
              <div className="flex flex-col items-center">
                <ArrowRightIcon />
                <span className="text-xs font-bold">→</span>
              </div>
            </ControlButton>
          </div>

          {/* Fila 2: Caída rápida y Rotar - Compactos */}
          <div className="flex justify-center items-center gap-3 mb-2">
            <ControlButton 
              onClick={touchControls.hardDrop} 
              className="cursor-pointer"
              variant="drop"
              size="wide"
            >
              <div className="flex items-center gap-1">
                <ArrowDownIcon />
                <ArrowDownIcon />
                <span className="text-xs font-bold">CAÍDA</span>
              </div>
            </ControlButton>

            <ControlButton 
              onClick={touchControls.rotate} 
              className="cursor-pointer"
              variant="rotate"
              size="normal"
            >
              <div className="flex flex-col items-center">
                <RotateIcon />
                <span className="text-xs font-bold">ROTAR</span>
              </div>
            </ControlButton>
          </div>
        </div>
      )}

      {/* SEGUNDO: Controles de juego (Start/Pause/Reset) */}
      <div className="flex flex-wrap gap-3 justify-center">
        {!isPlaying && !isGameOver && (
          <ControlButton 
            onClick={handleStartGameDebug} 
            variant="action" 
            size="wide"
            className="px-8 py-6 text-xl font-bold w-full md:w-auto shadow-xl relative z-20 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <PlayIcon />
              <span>🎮 JUGAR</span>
            </div>
          </ControlButton>
        )}
        
        {isPlaying && !isGameOver && (
          <ControlButton 
            onClick={touchControls.pause} 
            variant="secondary" 
            size="normal"
            className="px-6 py-4 text-lg font-bold w-full md:w-auto relative z-20 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <PauseIcon />
              <span>⏸️ PAUSA</span>
            </div>
          </ControlButton>
        )}
        
        {(isGameOver || isPlaying) && (
          <ControlButton 
            onClick={resetGame} 
            variant="action" 
            size="normal"
            className="px-6 py-4 text-lg font-bold w-full md:w-auto relative z-20 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>🔄 REINICIAR</span>
            </div>
          </ControlButton>
        )}
      </div>

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