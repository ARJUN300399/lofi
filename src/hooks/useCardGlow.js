import React from "react";
import { CARD_GLOW_MS } from "../config/player";

export function useCardGlow() {
  const [isCardLit, setIsCardLit] = React.useState(false);
  const cardGlowTimer = React.useRef();

  React.useEffect(() => {
    return () => {
      window.clearTimeout(cardGlowTimer.current);
    };
  }, []);

  const lightCard = React.useCallback(() => {
    setIsCardLit(true);
    window.clearTimeout(cardGlowTimer.current);
    cardGlowTimer.current = window.setTimeout(() => {
      setIsCardLit(false);
    }, CARD_GLOW_MS);
  }, []);

  return {
    isCardLit,
    lightCard,
  };
}
