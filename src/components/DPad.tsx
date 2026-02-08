import { Direction } from '../types/game';
import './DPad.css';

interface DPadProps {
  onDirectionPress: (direction: Direction) => void;
  disabled?: boolean;
}

const DPad = ({ onDirectionPress, disabled = false }: DPadProps) => {
  const handlePress = (direction: Direction) => {
    if (disabled) return;
    onDirectionPress(direction);
  };

  return (
    <div className="dpad-container">
      <div className="dpad">
        <button
          className="dpad-button dpad-up"
          onClick={() => handlePress(Direction.UP)}
          disabled={disabled}
          aria-label="Move Up"
        >
          <span className="arrow">▲</span>
        </button>
        <div className="dpad-middle">
          <button
            className="dpad-button dpad-left"
            onClick={() => handlePress(Direction.LEFT)}
            disabled={disabled}
            aria-label="Move Left"
          >
            <span className="arrow">◀</span>
          </button>
          <div className="dpad-center" />
          <button
            className="dpad-button dpad-right"
            onClick={() => handlePress(Direction.RIGHT)}
            disabled={disabled}
            aria-label="Move Right"
          >
            <span className="arrow">▶</span>
          </button>
        </div>
        <button
          className="dpad-button dpad-down"
          onClick={() => handlePress(Direction.DOWN)}
          disabled={disabled}
          aria-label="Move Down"
        >
          <span className="arrow">▼</span>
        </button>
      </div>
    </div>
  );
};

export default DPad;
