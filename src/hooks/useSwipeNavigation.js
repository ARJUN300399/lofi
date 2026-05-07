import React from "react";
import { SWIPE_DISTANCE_PX, SWIPE_TIME_MS } from "../config/player";

export function useSwipeNavigation({
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
}) {
  const swipeStart = React.useRef(null);

  const handlePointerDown = React.useCallback((event) => {
    if (event.target.closest("button, a")) {
      return;
    }

    event.currentTarget.setPointerCapture?.(event.pointerId);
    swipeStart.current = {
      x: event.clientX,
      y: event.clientY,
      time: Date.now(),
    };
  }, []);

  const handlePointerUp = React.useCallback(
    (event) => {
      if (!swipeStart.current) {
        return;
      }

      const deltaX = event.clientX - swipeStart.current.x;
      const deltaY = event.clientY - swipeStart.current.y;
      const elapsed = Date.now() - swipeStart.current.time;
      swipeStart.current = null;

      if (elapsed > SWIPE_TIME_MS) {
        return;
      }

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absY > absX && absY > SWIPE_DISTANCE_PX) {
        if (deltaY < 0) {
          onSwipeUp();
        } else {
          onSwipeDown();
        }
        return;
      }

      if (absX > SWIPE_DISTANCE_PX) {
        if (deltaX < 0) {
          onSwipeLeft();
        } else {
          onSwipeRight();
        }
      }
    },
    [onSwipeDown, onSwipeLeft, onSwipeRight, onSwipeUp]
  );

  const handlePointerCancel = React.useCallback(() => {
    swipeStart.current = null;
  }, []);

  return {
    onPointerCancel: handlePointerCancel,
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
  };
}
