// Position on the game board
export interface Position {
  x: number;
  y: number;
}

// Direction the snake is moving
export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

// Game state
export enum GameStatus {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
}

// Snake segment
export type Snake = Position[];

// Game configuration
export interface GameConfig {
  gridSize: number;
  cellSize: number;
  initialSpeed: number;
}
