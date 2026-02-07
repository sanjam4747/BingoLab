import React from 'react';
import { motion } from 'framer-motion';

function GameControls({ onPlayAgain, onCpuTurn, showCpuButton = false, showPlayAgain = false, isProcessing = false, gameEnded = false }) {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 px-2">
      {showCpuButton && (
        <motion.button
          whileHover={!isProcessing && !gameEnded ? { scale: 1.05, y: -3 } : {}}
          whileTap={!isProcessing && !gameEnded ? { scale: 0.95 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onCpuTurn}
          disabled={isProcessing || gameEnded}
          className={`
            relative px-6 py-3 sm:px-8 sm:py-4 font-bold rounded-lg sm:rounded-xl text-base sm:text-lg overflow-hidden
            transition-all duration-300 group w-full sm:w-auto
            ${isProcessing || gameEnded
              ? 'glass text-gray-500 cursor-not-allowed'
              : 'glass-strong text-white hover:glow-blue cursor-pointer'
            }
          `}
        >
          {!isProcessing && !gameEnded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
          <span className="relative z-10">
            {isProcessing ? '⏳ CPU Thinking...' : gameEnded ? '🏁 Game Over' : '🤖 CPU Turn'}
          </span>
        </motion.button>
      )}
      {showPlayAgain && (
        <motion.button
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onClick={onPlayAgain}
          className="
            relative px-6 py-3 sm:px-8 sm:py-4 font-bold rounded-lg sm:rounded-xl text-base sm:text-lg
            glass-strong text-white hover:glow-purple
            transition-all duration-300 overflow-hidden group w-full sm:w-auto
          "
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-lg sm:text-xl">🔄</span>
            <span>Play Again</span>
          </span>
        </motion.button>
      )}
    </div>
  );
}

export default GameControls;
