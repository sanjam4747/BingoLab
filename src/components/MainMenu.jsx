import React from 'react';
import { motion } from 'framer-motion';

function MainMenu({ currentMode, onModeChange }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
      >
        Select Game Mode
      </motion.h2>
      <div className="flex justify-center gap-6 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          onClick={() => onModeChange('fun')}
          className={`
            relative px-10 py-6 font-bold rounded-2xl text-xl
            transition-all duration-300 overflow-hidden group
            ${currentMode === 'fun'
              ? 'glass-strong text-white glow-blue'
              : 'glass text-gray-300 hover:glass-strong'
            }
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center gap-3">
            <span className="text-3xl">🎮</span>
            <span>Fun Bingo</span>
          </span>
          {currentMode === 'fun' && (
            <motion.div
              layoutId="activeMode"
              className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-2xl"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          onClick={() => onModeChange('word')}
          className={`
            relative px-10 py-6 font-bold rounded-2xl text-xl
            transition-all duration-300 overflow-hidden group
            ${currentMode === 'word'
              ? 'glass-strong text-white glow-pink'
              : 'glass text-gray-300 hover:glass-strong'
            }
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center gap-3">
            <span className="text-3xl">🍎</span>
            <span>Word Bingo</span>
          </span>
          {currentMode === 'word' && (
            <motion.div
              layoutId="activeMode"
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-2xl"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default MainMenu;
