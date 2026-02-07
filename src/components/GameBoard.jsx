import React from 'react';
import { motion } from 'framer-motion';

function GameBoard({ board, onCellClick, disabled = false }) {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 md:gap-3 max-w-lg mx-auto p-2 sm:p-3 md:p-4">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const index = rowIndex * 5 + colIndex;
            return (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.02,
                  duration: 0.3,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={!disabled && !cell.isCrossed ? { 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                } : {}}
                whileTap={!disabled && !cell.isCrossed ? { scale: 0.95 } : {}}
                onClick={() => !disabled && onCellClick(rowIndex, colIndex)}
                disabled={disabled}
                className={`
                  relative aspect-square flex items-center justify-center
                  text-base sm:text-xl md:text-2xl font-bold rounded-lg sm:rounded-xl
                  transition-all duration-300 overflow-hidden group
                  min-h-[44px] min-w-[44px]
                  ${!disabled && !cell.isCrossed ? 'cursor-pointer' : 'cursor-default'}
                  ${cell.isCrossed
                    ? 'glass text-green-400 border-green-500/50'
                    : 'glass-strong text-white hover:glow-purple'
                  }
                `}
              >
                {/* Gradient background on hover */}
                {!cell.isCrossed && !disabled && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                )}

                {/* Cell value */}
                <span className={`relative z-10 ${cell.isCrossed ? 'line-through' : ''}`}>
                  {cell.value}
                </span>

                {/* Checkmark for crossed cells */}
                {cell.isCrossed && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="text-2xl sm:text-3xl md:text-4xl">✓</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })
        )}
      </div>
    </div>
  );
}

export default GameBoard;
