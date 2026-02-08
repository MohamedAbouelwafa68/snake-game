import { useSnakeGame } from './hooks/useSnakeGame';
import { useSwipeControls } from './hooks/useSwipeControls';
import GameBoard from './components/GameBoard';
import DPad from './components/DPad';
import { GameStatus } from './types/game';
import './App.css';

function App() {
  const {
    snake,
    food,
    gameStatus,
    score,
    highScore,
    gridSize,
    cellSize,
    startGame,
    resetGame,
    changeDirection,
  } = useSnakeGame();

  // Enable swipe controls when game is playing
  useSwipeControls({
    onSwipe: changeDirection,
    enabled: gameStatus === GameStatus.PLAYING,
  });

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">🐍 Snake Game</h1>

        <div className="score-board">
          <div className="score-item">
            <span className="score-label">Score:</span>
            <span className="score-value">{score}</span>
          </div>
          <div className="score-item">
            <span className="score-label">High Score:</span>
            <span className="score-value">{highScore}</span>
          </div>
        </div>

        <div className="game-container">
          <GameBoard
            snake={snake}
            food={food}
            gridSize={gridSize}
            cellSize={cellSize}
            gameStatus={gameStatus}
          />

          {gameStatus === GameStatus.IDLE && (
            <div className="overlay">
              <div className="message">
                <h2>Welcome to Snake Game!</h2>
                <p>Press any arrow key to start</p>
                <button onClick={startGame} className="button">
                  Start Game
                </button>
              </div>
            </div>
          )}

          {gameStatus === GameStatus.GAME_OVER && (
            <div className="overlay">
              <div className="message">
                <h2>Game Over!</h2>
                <p className="final-score">Final Score: {score}</p>
                {score === highScore && score > 0 && (
                  <p className="new-high-score">🎉 New High Score!</p>
                )}
                <button onClick={resetGame} className="button">
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>

        <DPad
          onDirectionPress={changeDirection}
          disabled={gameStatus !== GameStatus.PLAYING}
        />

        <div className="instructions">
          <p>Use arrow keys ⬆️ ⬇️ ⬅️ ➡️ or swipe to control the snake</p>
          <p>Eat the red food to grow and score points!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
