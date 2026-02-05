import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import BingoLetters from './components/BingoLetters';
import MainMenu from './components/MainMenu';

function App() {
  const [gameMode, setGameMode] = useState(null); // null, 'fun', or 'word'
  const [playerBoard, setPlayerBoard] = useState(null);
  const [cpuBoard, setCpuBoard] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [winner, setWinner] = useState(null);
  const [wordBoard, setWordBoard] = useState(null);
  const [currentHint, setCurrentHint] = useState(null);
  const [targetFruit, setTargetFruit] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  // Fruits data with descriptions
  const fruitsData = [
    { name: 'Apple', description: 'A round red or green fruit with a crisp texture' },
    { name: 'Banana', description: 'A long yellow fruit with a soft sweet flesh' },
    { name: 'Orange', description: 'A citrus fruit with a bright orange peel' },
    { name: 'Grape', description: 'Small round fruits that grow in clusters' },
    { name: 'Mango', description: 'A tropical fruit with sweet orange flesh' },
    { name: 'Strawberry', description: 'A red berry with tiny seeds on the outside' },
    { name: 'Pineapple', description: 'A spiky tropical fruit with yellow flesh' },
    { name: 'Watermelon', description: 'A large green fruit with red watery flesh' },
    { name: 'Blueberry', description: 'Tiny round blue berries full of antioxidants' },
    { name: 'Kiwi', description: 'A brown fuzzy fruit with bright green flesh inside' },
    { name: 'Peach', description: 'A fuzzy orange fruit with a large pit' },
    { name: 'Pear', description: 'A green or yellow fruit shaped like a teardrop' },
    { name: 'Cherry', description: 'A small round red fruit with a pit' },
    { name: 'Lemon', description: 'A sour yellow citrus fruit' },
    { name: 'Lime', description: 'A small green citrus fruit' },
    { name: 'Plum', description: 'A purple or red fruit with smooth skin' },
    { name: 'Raspberry', description: 'A red berry made of many tiny segments' },
    { name: 'Apricot', description: 'A small orange fruit similar to a peach' },
    { name: 'Coconut', description: 'A brown hairy fruit with white flesh and milk' },
    { name: 'Papaya', description: 'An orange tropical fruit with black seeds' },
    { name: 'Pomegranate', description: 'A red fruit filled with juicy seeds' },
    { name: 'Avocado', description: 'A green fruit with creamy flesh and a large pit' },
    { name: 'Cantaloupe', description: 'A melon with orange flesh and netted skin' },
    { name: 'Blackberry', description: 'A dark purple berry with a sweet-tart flavor' },
    { name: 'Dragon Fruit', description: 'A pink fruit with white flesh and black seeds' }
  ];

  // Generate a random 5x5 board with numbers from 1-75
  const generateRandomBoard = () => {
    const numbers = [];
    const usedNumbers = new Set();
    
    // Generate 25 unique random numbers between 1 and 75
    while (numbers.length < 25) {
      const num = Math.floor(Math.random() * 75) + 1;
      if (!usedNumbers.has(num)) {
        usedNumbers.add(num);
        numbers.push(num);
      }
    }
    
    // Create 5x5 board with random numbers
    const board = [];
    let index = 0;
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        row.push({
          value: numbers[index++],
          isCrossed: false
        });
      }
      board.push(row);
    }
    return board;
  };

  // Generate a word board with all 25 fruits
  const generateWordBoard = () => {
    // Shuffle fruits array
    const shuffledFruits = [...fruitsData].sort(() => Math.random() - 0.5);
    
    // Create 5x5 board with fruit names
    const board = [];
    let index = 0;
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        row.push({
          value: shuffledFruits[index].name,
          description: shuffledFruits[index].description,
          isCrossed: false
        });
        index++;
      }
      board.push(row);
    }
    return board;
  };

  // Generate a new hint for Word Bingo mode
  const generateNewHint = (board) => {
    if (!board) return;
    
    // Get all uncrossed fruits
    const uncrossedFruits = [];
    board.forEach(row => {
      row.forEach(cell => {
        if (!cell.isCrossed) {
          uncrossedFruits.push(cell);
        }
      });
    });

    if (uncrossedFruits.length === 0) {
      setCurrentHint(null);
      setTargetFruit(null);
      setWinner('Player');
      return;
    }

    // Pick a random uncrossed fruit
    const randomFruit = uncrossedFruits[Math.floor(Math.random() * uncrossedFruits.length)];
    setCurrentHint(randomFruit.description);
    setTargetFruit(randomFruit.value);
  };

  // Initialize boards based on game mode
  useEffect(() => {
    if (gameMode === 'fun') {
      setWordBoard(null);
      setPlayerBoard(generateRandomBoard());
      setCpuBoard(generateRandomBoard());
      setPlayerScore(0);
      setCpuScore(0);
      setWinner(null);
      setCurrentHint(null);
      setTargetFruit(null);
      setIsProcessing(false);
      setIsPlayerTurn(true);
    } else if (gameMode === 'word') {
      setPlayerBoard(null);
      setCpuBoard(null);
      const newWordBoard = generateWordBoard();
      setWordBoard(newWordBoard);
      setPlayerScore(0);
      setCpuScore(0);
      setWinner(null);
      setIsProcessing(false);
      generateNewHint(newWordBoard);
    }
  }, [gameMode]);

  // Calculate how many lines (rows, columns, diagonals) are completed
  const calculateBingoLetters = (board) => {
    if (!board) return 0;
    
    let completedLines = 0;

    // Check rows
    for (let i = 0; i < 5; i++) {
      if (board[i].every(cell => cell.isCrossed)) {
        completedLines++;
      }
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
      let columnComplete = true;
      for (let row = 0; row < 5; row++) {
        if (!board[row][col].isCrossed) {
          columnComplete = false;
          break;
        }
      }
      if (columnComplete) {
        completedLines++;
      }
    }

    // Check main diagonal (top-left to bottom-right)
    let diagonal1Complete = true;
    for (let i = 0; i < 5; i++) {
      if (!board[i][i].isCrossed) {
        diagonal1Complete = false;
        break;
      }
    }
    if (diagonal1Complete) {
      completedLines++;
    }

    // Check anti-diagonal (top-right to bottom-left)
    let diagonal2Complete = true;
    for (let i = 0; i < 5; i++) {
      if (!board[i][4 - i].isCrossed) {
        diagonal2Complete = false;
        break;
      }
    }
    if (diagonal2Complete) {
      completedLines++;
    }

    return completedLines;
  };

  // Update scores whenever boards change
  useEffect(() => {
    if (gameMode === 'fun' && playerBoard && cpuBoard && !winner) {
      const playerLines = calculateBingoLetters(playerBoard);
      const cpuLines = calculateBingoLetters(cpuBoard);
      
      setPlayerScore(playerLines);
      setCpuScore(cpuLines);

      // Check for winner (first to 5 lines)
      if (playerLines >= 5) {
        setWinner('Player');
      } else if (cpuLines >= 5) {
        setWinner('CPU');
      }
    }
  }, [playerBoard, cpuBoard, gameMode, winner]);

  // Mark a number on BOTH player and CPU boards (Fun Bingo mode)
  const markNumber = (num) => {
    setPlayerBoard(prevBoard => {
      return prevBoard.map(row =>
        row.map(cell => {
          if (cell.value === num) {
            return { ...cell, isCrossed: true };
          }
          return cell;
        })
      );
    });

    setCpuBoard(prevBoard => {
      return prevBoard.map(row =>
        row.map(cell => {
          if (cell.value === num) {
            return { ...cell, isCrossed: true };
          }
          return cell;
        })
      );
    });
  };

  // Handle player clicking on their board in Fun Bingo mode
  const handlePlayerBoardClick = (rowIndex, colIndex) => {
    if (isProcessing || winner || !isPlayerTurn) return;
    
    const clickedCell = playerBoard[rowIndex][colIndex];
    
    // Only mark if not already crossed
    if (!clickedCell.isCrossed) {
      markNumber(clickedCell.value);
      setIsPlayerTurn(false);
      
      // Automatically trigger CPU turn after player's move
      setTimeout(() => {
        cpuTurn();
      }, 800);
    }
  };

  // CPU picks a random uncrossed number and marks it after 1 second
  const cpuTurn = () => {
    if (!cpuBoard || isProcessing || winner) return;

    // Get all uncrossed numbers from CPU's board
    const uncrossedNumbers = [];
    cpuBoard.forEach(row => {
      row.forEach(cell => {
        if (!cell.isCrossed) {
          uncrossedNumbers.push(cell.value);
        }
      });
    });

    if (uncrossedNumbers.length === 0) {
      return;
    }

    setIsProcessing(true);

    // Pick a random uncrossed number
    const randomIndex = Math.floor(Math.random() * uncrossedNumbers.length);
    const selectedNumber = uncrossedNumbers[randomIndex];

    // Call markNumber after 1 second delay
    setTimeout(() => {
      markNumber(selectedNumber);
      setIsProcessing(false);
      setIsPlayerTurn(true);
    }, 1000);
  };

  // Handle word board cell click
  const handleWordBoardClick = (rowIndex, colIndex) => {
    if (!wordBoard || winner) return;
    
    const clickedCell = wordBoard[rowIndex][colIndex];
    
    // Check if clicked fruit matches the current hint
    if (clickedCell.value === targetFruit && !clickedCell.isCrossed) {
      // Mark as crossed
      const newBoard = wordBoard.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          if (rIdx === rowIndex && cIdx === colIndex) {
            return { ...cell, isCrossed: true };
          }
          return cell;
        })
      );
      setWordBoard(newBoard);
      
      // Generate new hint
      setTimeout(() => {
        generateNewHint(newBoard);
      }, 300);
    }
  };

  // Play Again - reshuffle board and reset crossed status
  const playAgain = () => {
    if (gameMode === 'fun') {
      setPlayerBoard(generateRandomBoard());
      setCpuBoard(generateRandomBoard());
      setPlayerScore(0);
      setCpuScore(0);
      setWinner(null);
      setIsProcessing(false);
      setIsPlayerTurn(true);
    } else if (gameMode === 'word') {
      const newWordBoard = generateWordBoard();
      setWordBoard(newWordBoard);
      setPlayerScore(0);
      setCpuScore(0);
      setWinner(null);
      setIsProcessing(false);
      generateNewHint(newWordBoard);
    }
  };

  // Handle mode change from MainMenu
  const handleModeChange = (mode) => {
    // Reset all game state when switching modes
    setGameMode(mode);
    setPlayerScore(0);
    setCpuScore(0);
    setWinner(null);
    setIsProcessing(false);
    setCurrentHint(null);
    setTargetFruit(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          🎯 5x5 Bingo Game
        </h1>
        
        {/* Main Menu - Show when no mode selected */}
        {!gameMode && (
          <MainMenu currentMode={gameMode} onModeChange={handleModeChange} />
        )}

        {/* Fun Bingo Mode */}
        {gameMode === 'fun' && playerBoard && cpuBoard && (
          <>
            {/* Back to Menu Button */}
            <div className="mb-4 flex justify-between items-center">
              <button
                onClick={() => setGameMode(null)}
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                ← Back to Menu
              </button>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Fun Bingo Mode
              </h2>
              <div className="w-32"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              {/* Player Board */}
              <div>
                <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
                  Player Board
                </h2>
                <BingoLetters 
                  completedLines={playerScore} 
                  isWinner={winner === 'Player'}
                  playerName="Player"
                />
                <div className="mt-4">
                  <GameBoard 
                    board={playerBoard} 
                    onCellClick={handlePlayerBoardClick}
                    disabled={!isPlayerTurn || isProcessing || !!winner}
                  />
                </div>
                {!winner && (
                  <div className="mt-3 text-center">
                    <span className={`px-4 py-2 rounded-lg font-semibold ${
                      isPlayerTurn && !isProcessing
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {isPlayerTurn && !isProcessing ? '✓ Your Turn' : isProcessing ? '⏳ CPU\'s Turn...' : '⏳ Waiting...'}
                    </span>
                  </div>
                )}
              </div>

              {/* CPU Board - Only show when game ends */}
              <div>
                <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
                  CPU Board
                </h2>
                {winner ? (
                  <>
                    <BingoLetters 
                      completedLines={cpuScore} 
                      isWinner={winner === 'CPU'}
                      playerName="CPU"
                    />
                    <div className="mt-4">
                      <GameBoard 
                        board={cpuBoard} 
                        onCellClick={() => {}} 
                        disabled={true}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-8 bg-gray-100 rounded-xl">
                      <div className="text-6xl mb-4">🎭</div>
                      <p className="text-xl font-bold text-gray-700">Hidden</p>
                      <p className="text-sm text-gray-500 mt-2">CPU board will be revealed<br/>when the game ends</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <GameControls 
              onPlayAgain={playAgain}
              showPlayAgain={true}
              isProcessing={isProcessing}
              gameEnded={!!winner}
            />
          </>
        )}

        {/* Word Bingo Mode */}
        {gameMode === 'word' && wordBoard && (
          <>
            {/* Back to Menu Button */}
            <div className="mb-4 flex justify-between items-center">
              <button
                onClick={() => setGameMode(null)}
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                ← Back to Menu
              </button>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Word Bingo Mode
              </h2>
              <div className="w-32"></div>
            </div>

            {/* Current Hint Section */}
            <div className="mb-6 p-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
                🔍 Current Hint
              </h2>
              <p className="text-2xl font-semibold text-gray-900 text-center">
                {currentHint || 'Loading...'}
              </p>
              <p className="text-sm text-gray-700 text-center mt-2">
                Click the fruit that matches this description!
              </p>
            </div>

            {/* Word Board */}
            <div className="mb-6">
              <div className="grid grid-cols-5 gap-2 max-w-2xl mx-auto">
                {wordBoard.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleWordBoardClick(rowIndex, colIndex)}
                      disabled={winner || cell.isCrossed}
                      className={`
                        aspect-square flex items-center justify-center
                        text-sm font-bold rounded-lg p-2
                        transition-all duration-200 transform
                        ${
                          !winner && !cell.isCrossed
                            ? 'hover:scale-105 active:scale-95 cursor-pointer'
                            : 'cursor-default'
                        }
                        ${
                          cell.isCrossed
                            ? 'bg-green-500 text-white line-through opacity-60'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }
                      `}
                    >
                      {cell.value}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Win Message and Controls */}
            {winner && (
              <div className="mb-4 p-4 bg-green-500 text-white font-bold text-2xl rounded-lg text-center animate-bounce">
                🎉 Congratulations! You completed the board! 🎉
              </div>
            )}

            <GameControls onPlayAgain={playAgain} showPlayAgain={true} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
