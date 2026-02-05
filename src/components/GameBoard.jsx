import React from 'react';

function GameBoard({ board, onCellClick, disabled = false }) {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-5 gap-2 max-w-lg mx-auto">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => !disabled && onCellClick(rowIndex, colIndex)}
              disabled={disabled}
              className={`
                aspect-square flex items-center justify-center
                text-2xl font-bold rounded-lg
                transition-all duration-200 transform
                ${!disabled && 'hover:scale-105 active:scale-95'}
                ${cell.isCrossed
                  ? 'bg-green-500 text-white line-through'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                }
                ${disabled && 'cursor-default'}
              `}
            >
              {cell.value}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default GameBoard;
