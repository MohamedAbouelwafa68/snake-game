import { useEffect, useRef } from 'react';
import { Snake, Position, GameStatus } from '../types/game';

interface GameBoardProps {
  snake: Snake;
  food: Position;
  gridSize: number;
  cellSize: number;
  gameStatus: GameStatus;
}

const GameBoard = ({ snake, food, gridSize, cellSize, gameStatus }: GameBoardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#16213e';
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridSize; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, gridSize * cellSize);
      ctx.stroke();

      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(gridSize * cellSize, i * cellSize);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#e94560';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#e94560';
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 2 - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw snake
    snake.forEach((segment, index) => {
      if (index === 0) {
        // Head
        ctx.fillStyle = '#0f3460';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#0f3460';
      } else {
        // Body
        ctx.fillStyle = '#16213e';
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#16213e';
      }

      ctx.fillRect(
        segment.x * cellSize + 1,
        segment.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2
      );
    });

    ctx.shadowBlur = 0;

    // Draw game over overlay
    if (gameStatus === GameStatus.GAME_OVER) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#e94560';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    }
  }, [snake, food, gridSize, cellSize, gameStatus]);

  return (
    <canvas
      ref={canvasRef}
      width={gridSize * cellSize}
      height={gridSize * cellSize}
      style={{
        border: '3px solid #0f3460',
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(15, 52, 96, 0.5)',
        maxWidth: '100%',
        height: 'auto',
        touchAction: 'none',
      }}
    />
  );
};

export default GameBoard;
