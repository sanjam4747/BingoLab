import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import BingoLetters from './components/BingoLetters';
import MainMenu from './components/MainMenu';
import LandingPage from './components/LandingPage';

function App() {
  const [showLanding, setShowLanding] = useState(true);
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

  // Fruits data with child-friendly descriptions
  const fruitsData = [
    { name: 'Apple', description: 'A crunchy red or green fruit that keeps the doctor away!' },
    { name: 'Banana', description: 'A long yellow fruit that monkeys love to eat' },
    { name: 'Orange', description: 'A round orange fruit that you peel before eating' },
    { name: 'Grape', description: 'Tiny purple or green balls that grow in bunches' },
    { name: 'Strawberry', description: 'A sweet red heart-shaped fruit with seeds outside' },
    { name: 'Watermelon', description: 'A huge green fruit that is pink and juicy inside' },
    { name: 'Blueberry', description: 'Little round blue fruits that are super tiny' },
    { name: 'Cherry', description: 'Small shiny red fruit that grows on trees' },
    { name: 'Peach', description: 'A soft orange fuzzy fruit with a big seed inside' },
    { name: 'Pear', description: 'Like an apple but shaped like a bell or teardrop' },
    { name: 'Pineapple', description: 'A big spiky yellow fruit that looks like a crown' },
    { name: 'Mango', description: 'A sweet tropical fruit that is orange inside' },
    { name: 'Kiwi', description: 'A small brown fuzzy fruit that is bright green inside' },
    { name: 'Lemon', description: 'A sour yellow fruit used to make lemonade' },
    { name: 'Raspberry', description: 'A tiny red bumpy berry that looks like a little hat' },
    { name: 'Coconut', description: 'A hard brown ball with white inside and yummy milk' },
    { name: 'Plum', description: 'A smooth purple fruit that is juicy and sweet' },
    { name: 'Tangerine', description: 'A small orange that is easy to peel' },
    { name: 'Melon', description: 'A big round fruit with green skin and sweet inside' },
    { name: 'Blackberry', description: 'A dark purple berry that grows on bushes' },
    { name: 'Lime', description: 'A small green fruit that tastes sour like lemon' },
    { name: 'Apricot', description: 'A small orange fruit that looks like a tiny peach' },
    { name: 'Tomato', description: 'A red round fruit often used like a vegetable' },
    { name: 'Avocado', description: 'A green fruit that is creamy and used to make guacamole' },
    { name: 'Fig', description: 'A soft purple or green fruit that is sweet inside' }
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

  // Show landing page first
  if (showLanding) {
    return (
      <div className="min-h-screen mesh-gradient-animated">
        <LandingPage onStartGame={() => setShowLanding(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-2 sm:p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-6 md:p-10 max-w-7xl w-full"
      >
        {/* Back to Landing Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowLanding(true);
            setGameMode(null);
          }}
          className="mb-4 px-4 py-2 glass-strong text-white text-sm font-semibold rounded-lg hover:glow-purple transition-all duration-300"
        >
          ← Back to Home
        </motion.button>

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
        >
          🎯 5x5 Bingo Game
        </motion.h1>
        
        {/* Main Menu - Show when no mode selected */}
        <AnimatePresence mode="wait">
          {!gameMode && (
            <MainMenu currentMode={gameMode} onModeChange={handleModeChange} />
          )}
        </AnimatePresence>

        {/* Fun Bingo Mode */}
        <AnimatePresence mode="wait">
          {gameMode === 'fun' && playerBoard && cpuBoard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back to Menu Button */}
              <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
                <motion.button
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGameMode(null)}
                  className="px-4 py-2 sm:px-6 sm:py-3 glass-strong text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:glow-purple transition-all duration-300 w-full sm:w-auto"
                >
                  ← Back to Menu
                </motion.button>
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent"
                >
                  Fun Bingo Mode
                </motion.h2>
                <div className="hidden sm:block sm:w-24 md:w-32"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
                {/* Player Board */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="glass p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-300">
                    Player Board
                  </h2>
                  <BingoLetters 
                    completedLines={playerScore} 
                    isWinner={winner === 'Player'}
                    playerName="Player"
                  />
                  <div className="mt-6">
                    <GameBoard 
                      board={playerBoard} 
                      onCellClick={handlePlayerBoardClick}
                      disabled={!isPlayerTurn || isProcessing || !!winner}
                    />
                  </div>
                  {!winner && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 text-center"
                    >
                      <span className={`px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 ${
                        isPlayerTurn && !isProcessing
                          ? 'glass-strong text-green-400 glow-blue'
                          : 'glass text-gray-500'
                      }`}>
                        {isPlayerTurn && !isProcessing ? '✓ Your Turn' : isProcessing ? '⏳ CPU\'s Turn...' : '⏳ Waiting...'}
                      </span>
                    </motion.div>
                  )}
                </motion.div>

                {/* CPU Board - Only show when game ends */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="glass p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-300">
                    CPU Board
                  </h2>
                  {winner ? (
                    <>
                      <BingoLetters 
                        completedLines={cpuScore} 
                        isWinner={winner === 'CPU'}
                        playerName="CPU"
                      />
                      <div className="mt-6">
                        <GameBoard 
                          board={cpuBoard} 
                          onCellClick={() => {}} 
                          disabled={true}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[250px] sm:min-h-[350px] md:min-h-[400px]">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center p-4 sm:p-6 md:p-8 glass-strong rounded-xl sm:rounded-2xl"
                      >
                        <motion.div 
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6"
                        >
                          🎭
                        </motion.div>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300 mb-2 sm:mb-3">Hidden</p>
                        <p className="text-xs sm:text-sm text-gray-500">CPU board will be revealed<br/>when the game ends</p>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </div>

              <GameControls 
                onPlayAgain={playAgain}
                showPlayAgain={true}
                isProcessing={isProcessing}
                gameEnded={!!winner}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Word Bingo Mode */}
        <AnimatePresence mode="wait">
          {gameMode === 'word' && wordBoard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back to Menu Button */}
              <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
                <motion.button
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGameMode(null)}
                  className="px-4 py-2 sm:px-6 sm:py-3 glass-strong text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:glow-pink transition-all duration-300 w-full sm:w-auto"
                >
                  ← Back to Menu
                </motion.button>
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent"
                >
                  Word Bingo Mode
                </motion.h2>
                <div className="hidden sm:block sm:w-24 md:w-32"></div>
              </div>

              {/* Current Hint Section */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 sm:mb-6 md:mb-8 p-4 sm:p-6 md:p-8 glass-strong rounded-xl sm:rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600/5 to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.h2 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300 mb-2 sm:mb-3 text-center relative z-10"
                >
                  🔍 Current Hint
                </motion.h2>
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white text-center mb-2 sm:mb-3 relative z-10 px-2">
                  {currentHint || 'Loading...'}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 text-center relative z-10">
                  Click the fruit that matches this description!
                </p>
              </motion.div>

              {/* Word Board */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 sm:mb-8"
              >
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 md:gap-3 max-w-3xl mx-auto p-2 sm:p-3 md:p-4">
                  {wordBoard.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                      const index = rowIndex * 5 + colIndex;
                      return (
                        <motion.button
                          key={`${rowIndex}-${colIndex}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            delay: index * 0.02,
                            duration: 0.3
                          }}
                          whileHover={
                            !winner && !cell.isCrossed
                              ? { scale: 1.1, rotate: [0, -2, 2, 0] }
                              : {}
                          }
                          whileTap={!winner && !cell.isCrossed ? { scale: 0.95 } : {}}
                          onClick={() => handleWordBoardClick(rowIndex, colIndex)}
                          disabled={winner || cell.isCrossed}
                          className={`
                            relative aspect-square flex items-center justify-center
                            text-[0.6rem] xs:text-xs sm:text-sm md:text-base font-bold rounded-lg sm:rounded-xl p-1 sm:p-2
                            transition-all duration-300 overflow-hidden group
                            ${
                              !winner && !cell.isCrossed
                                ? 'glass-strong cursor-pointer hover:glow-blue'
                                : 'glass cursor-default'
                            }
                            ${
                              cell.isCrossed
                                ? 'text-green-400 border-2 border-green-500/60 bg-green-500/10'
                                : 'text-white'
                            }
                          `}
                        >
                          {/* Green background for selected cells */}
                          {cell.isCrossed && (
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg sm:rounded-xl"></div>
                          )}

                          {!cell.isCrossed && !winner && (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 via-gray-500/10 to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          )}
                          {!cell.isCrossed && !winner && (
                            <div className="absolute inset-0 shimmer"></div>
                          )}
                          <span className={`relative z-10 ${cell.isCrossed ? 'line-through' : ''}`}>
                            {cell.value}
                          </span>
                          {cell.isCrossed && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", duration: 0.5 }}
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
              </motion.div>

              {/* Win Message and Controls */}
              {winner && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="mb-4 sm:mb-6 p-4 sm:p-6 glass-strong text-white font-bold text-base sm:text-xl md:text-2xl rounded-xl sm:rounded-2xl text-center glow-purple"
                >
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    🎉 Congratulations! You completed the board! 🎉
                  </motion.span>
                </motion.div>
              )}

              <GameControls onPlayAgain={playAgain} showPlayAgain={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
