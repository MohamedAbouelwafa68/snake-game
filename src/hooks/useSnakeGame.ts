import { useState, useEffect, useCallback, useRef } from 'react';
import { Position, Direction, GameStatus, Snake, GameConfig } from '../types/game';

const GRID_SIZE = 20;
const CELL_SIZE = 25;
const INITIAL_SPEED = 150;

const INITIAL_SNAKE: Snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const INITIAL_DIRECTION = Direction.RIGHT;

export const useSnakeGame = (config?: Partial<GameConfig>) => {
  const gridSize = config?.gridSize || GRID_SIZE;
  const cellSize = config?.cellSize || CELL_SIZE;
  const speed = config?.initialSpeed || INITIAL_SPEED;

  const [snake, setSnake] = useState<Snake>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Use ref to track the current direction to prevent multiple direction changes in one tick
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Generate random food position that doesn't overlap with snake
  const generateFood = useCallback(
    (currentSnake: Snake): Position => {
      let newFood: Position;
      let isOnSnake: boolean;

      do {
        newFood = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize),
        };
        isOnSnake = currentSnake.some(
          (segment) => segment.x === newFood.x && segment.y === newFood.y
        );
      } while (isOnSnake);

      return newFood;
    },
    [gridSize]
  );

  // Check if position is out of bounds
  const isOutOfBounds = useCallback(
    (pos: Position): boolean => {
      return pos.x < 0 || pos.x >= gridSize || pos.y < 0 || pos.y >= gridSize;
    },
    [gridSize]
  );

  // Check if snake collides with itself
  const checkSelfCollision = useCallback((head: Position, body: Snake): boolean => {
    return body.some((segment) => segment.x === head.x && segment.y === head.y);
  }, []);

  // Move snake in the current direction
  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const currentDirection = directionRef.current;

      let newHead: Position;

      switch (currentDirection) {
        case Direction.UP:
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case Direction.DOWN:
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case Direction.LEFT:
          newHead = { x: head.x - 1, y: head.y };
          break;
        case Direction.RIGHT:
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Check collisions
      if (isOutOfBounds(newHead) || checkSelfCollision(newHead, prevSnake.slice(1))) {
        setGameStatus(GameStatus.GAME_OVER);
        return prevSnake;
      }

      // Create new snake with new head
      const newSnake = [newHead, ...prevSnake];

      // Check if food is eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('snakeHighScore', newScore.toString());
          }
          return newScore;
        });
        setFood(generateFood(newSnake));
        return newSnake; // Don't remove tail, snake grows
      }

      // Remove tail if no food eaten
      newSnake.pop();
      return newSnake;
    });
  }, [food, generateFood, isOutOfBounds, checkSelfCollision, highScore]);

  // Handle direction change
  const changeDirection = useCallback((newDirection: Direction) => {
    const currentDirection = directionRef.current;

    // Prevent reversing direction
    const isOpposite =
      (currentDirection === Direction.UP && newDirection === Direction.DOWN) ||
      (currentDirection === Direction.DOWN && newDirection === Direction.UP) ||
      (currentDirection === Direction.LEFT && newDirection === Direction.RIGHT) ||
      (currentDirection === Direction.RIGHT && newDirection === Direction.LEFT);

    if (!isOpposite) {
      directionRef.current = newDirection;
      setDirection(newDirection);
    }
  }, []);

  // Start game
  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setGameStatus(GameStatus.PLAYING);
  }, [generateFood]);

  // Reset game
  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);

  // Keyboard event handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameStatus === GameStatus.IDLE) {
        if (
          event.key === 'ArrowUp' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight'
        ) {
          startGame();
        }
        return;
      }

      if (gameStatus !== GameStatus.PLAYING) return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          changeDirection(Direction.UP);
          break;
        case 'ArrowDown':
          event.preventDefault();
          changeDirection(Direction.DOWN);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          changeDirection(Direction.LEFT);
          break;
        case 'ArrowRight':
          event.preventDefault();
          changeDirection(Direction.RIGHT);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStatus, changeDirection, startGame]);

  // Game loop
  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING) {
      gameLoopRef.current = setInterval(moveSnake, speed);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameStatus, moveSnake, speed]);

  return {
    snake,
    food,
    direction,
    gameStatus,
    score,
    highScore,
    gridSize,
    cellSize,
    startGame,
    resetGame,
    changeDirection,
  };
};
