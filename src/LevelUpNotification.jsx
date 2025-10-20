import React from 'react';

const LevelUpNotification = ({ isVisible, level }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-6 py-3 rounded-full shadow-2xl border-2 border-yellow-300">
        <div className="flex items-center space-x-2">
          <div className="text-2xl">🎉</div>
          <div className="font-bold text-lg">
            ¡NIVEL {level}!
          </div>
          <div className="text-2xl">🚀</div>
        </div>
        <div className="text-center text-sm text-yellow-100 mt-1">
          ¡Las piezas bajan más rápido!
        </div>
      </div>
    </div>
  );
};

export default LevelUpNotification;