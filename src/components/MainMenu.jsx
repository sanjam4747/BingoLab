import React from 'react';

function MainMenu({ currentMode, onModeChange }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
        Select Game Mode
      </h2>
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => onModeChange('fun')}
          className={`
            px-8 py-4 font-bold rounded-xl text-lg
            transition-all duration-200 transform
            ${currentMode === 'fun'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-102'
            }
          `}
        >
          🎮 Fun Bingo
        </button>
        <button
          onClick={() => onModeChange('word')}
          className={`
            px-8 py-4 font-bold rounded-xl text-lg
            transition-all duration-200 transform
            ${currentMode === 'word'
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-102'
            }
          `}
        >
          🍎 Word Bingo
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
