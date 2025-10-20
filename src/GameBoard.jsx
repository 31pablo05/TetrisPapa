import React from 'react';
import { BOARD_WIDTH, BOARD_HEIGHT } from './tetrominoShapes';

const GameBoard = ({ board, className = '' }) => {
  return (
    <div className={`game-board ${className}`}>
      <div 
        className="grid gap-[1px] bg-gray-800/50 p-2 rounded-lg shadow-2xl border border-gray-600/30"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                cell aspect-square rounded-sm transition-all duration-150
                ${cell 
                  ? `${cell.color} ${cell.glowColor} shadow-lg border border-white/20 ${cell.isCurrent ? 'animate-pulse' : ''}` 
                  : 'bg-gray-900/40 border border-gray-700/30'
                }
              `}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;