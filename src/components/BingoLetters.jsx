import React from 'react';

function BingoLetters({ completedLines, isWinner, playerName }) {
  const letters = ['B', 'I', 'N', 'G', 'O'];
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 mb-2">
        {letters.map((letter, index) => (
          <div
            key={letter}
            className={`
              w-12 h-12 flex items-center justify-center
              text-2xl font-bold rounded-lg
              transition-all duration-300 transform
              ${index < completedLines
                ? 'bg-yellow-400 text-gray-800 scale-110 shadow-lg'
                : 'bg-gray-300 text-gray-500'
              }
              ${isWinner && 'animate-pulse'}
            `}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="text-sm font-semibold text-gray-600">
        {completedLines} {completedLines === 1 ? 'line' : 'lines'} completed
      </div>
      {isWinner && (
        <div className="mt-2 px-4 py-2 bg-green-500 text-white font-bold rounded-lg animate-bounce">
          🎉 {playerName} WINS! 🎉
        </div>
      )}
    </div>
  );
}

export default BingoLetters;
