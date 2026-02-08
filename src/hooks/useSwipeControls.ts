import { useEffect, useRef } from 'react';
import { Direction } from '../types/game';

interface SwipeControlsOptions {
  onSwipe: (direction: Direction) => void;
  minSwipeDistance?: number;
  enabled: boolean;
}

export const useSwipeControls = ({
  onSwipe,
  minSwipeDistance = 30,
  enabled,
}: SwipeControlsOptions) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Check if swipe distance is sufficient
      if (absDeltaX < minSwipeDistance && absDeltaY < minSwipeDistance) {
        touchStartRef.current = null;
        return;
      }

      // Determine swipe direction (horizontal or vertical)
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          onSwipe(Direction.RIGHT);
        } else {
          onSwipe(Direction.LEFT);
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          onSwipe(Direction.DOWN);
        } else {
          onSwipe(Direction.UP);
        }
      }

      touchStartRef.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent page scrolling while swiping on game area
      if (touchStartRef.current) {
        e.preventDefault();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onSwipe, minSwipeDistance, enabled]);
};
