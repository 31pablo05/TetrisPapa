import React from 'react';

const LevelUpNotification = ({ isVisible, level }) => {
  if (!isVisible) return null;

  // Calcular líneas necesarias para el siguiente nivel
  const getLinesForNextLevel = (currentLevel) => {
    if (currentLevel === 1) return 10;
    if (currentLevel === 2) return 25;
    if (currentLevel === 3) return 45;
    if (currentLevel === 4) return 70;
    if (currentLevel === 5) return 100;
    return 100 + (currentLevel - 5) * 35;
  };

  const nextLevelLines = getLinesForNextLevel(level);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-6 py-4 rounded-xl shadow-2xl border-2 border-yellow-300">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="text-2xl">🎉</div>
          <div className="font-bold text-xl">
            ¡NIVEL {level}!
          </div>
          <div className="text-2xl">🚀</div>
        </div>
        <div className="text-center text-sm text-yellow-100">
          ¡Velocidad aumentada!
        </div>
        <div className="text-center text-xs text-yellow-200 mt-1">
          Siguiente nivel: {nextLevelLines} líneas totales
        </div>
      </div>
    </div>
  );
};

export default LevelUpNotification;