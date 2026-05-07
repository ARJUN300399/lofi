import React from "react";
import { SLIDE_DURATION_MS } from "../config/player";
import moodTexts from "../content/moodTexts";

export function useSlideTransition(gifs) {
  const [slide, setSlide] = React.useState(null);
  const slideTimer = React.useRef();

  React.useEffect(() => {
    return () => {
      window.clearTimeout(slideTimer.current);
    };
  }, []);

  const startSlide = React.useCallback(
    ({
      direction,
      fromGifIndex,
      fromMoodIndex,
      fromSong,
      toGifIndex,
      toMoodIndex,
      toSong,
    }) => {
      window.clearTimeout(slideTimer.current);

      setSlide({
        direction,
        fromGif: gifs[fromGifIndex],
        fromMoodText: moodTexts[fromMoodIndex],
        fromSong,
        key: Date.now(),
        toGif: gifs[toGifIndex],
        toMoodText: moodTexts[toMoodIndex],
        toSong,
      });

      slideTimer.current = window.setTimeout(() => {
        setSlide(null);
      }, SLIDE_DURATION_MS);
    },
    [gifs]
  );

  return {
    slide,
    startSlide,
  };
}
