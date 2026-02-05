import React from 'react';
import { motion } from 'framer-motion';

function BingoLetters({ completedLines, isWinner, playerName }) {
  const letters = ['B', 'I', 'N', 'G', 'O'];
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3 mb-4">
        {letters.map((letter, index) => (
          <motion.div
            key={letter}
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0
            }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.5
            }}
            className={`
              relative w-14 h-14 flex items-center justify-center
              text-3xl font-bold rounded-xl
              transition-all duration-500
              ${index < completedLines
                ? 'glass-strong text-yellow-300 glow-purple'
                : 'glass text-gray-500'
              }
            `}
          >
            {index < completedLines && (
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-xl" />
            )}
            <span className="relative z-10">{letter}</span>
          </motion.div>
        ))}
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm font-semibold text-gray-400 mb-2"
      >
        {completedLines} {completedLines === 1 ? 'line' : 'lines'} completed
      </motion.div>
      {isWinner && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: 0
          }}
          transition={{ 
            scale: { repeat: Infinity, duration: 1 },
            rotate: { duration: 0.5 }
          }}
          className="mt-3 px-6 py-3 glass-strong text-white font-bold rounded-xl glow-purple"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="inline-block"
          >
            🎉 {playerName} WINS! 🎉
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}

export default BingoLetters;
