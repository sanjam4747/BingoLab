import React from 'react';

function GameControls({ onPlayAgain, onCpuTurn, showCpuButton = false, showPlayAgain = false, isProcessing = false, gameEnded = false }) {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      {showCpuButton && (
        <button
          onClick={onCpuTurn}
          disabled={isProcessing || gameEnded}
          className={`
            px-6 py-3 font-semibold rounded-lg
            transition-colors duration-200
            shadow-md hover:shadow-lg
            ${isProcessing || gameEnded
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'
            }
          `}
        >
          {isProcessing ? 'CPU Thinking...' : gameEnded ? 'Game Over' : 'CPU Turn'}
        </button>
      )}
      {showPlayAgain && (
        <button
          onClick={onPlayAgain}
          className="
            px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg
            hover:bg-blue-600 active:bg-blue-700
            transition-colors duration-200
            shadow-md hover:shadow-lg
          "
        >
          🔄 Play Again
        </button>
      )}
    </div>
  );
}

export default GameControls;
