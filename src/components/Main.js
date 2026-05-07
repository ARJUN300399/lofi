import React from "react";
import { useCardGlow } from "../hooks/useCardGlow";
import { useLofiRadio } from "../hooks/useLofiRadio";
import { useSwipeNavigation } from "../hooks/useSwipeNavigation";
import GithubLink from "./GithubLink";
import PlayerPanel from "./PlayerPanel";
import SlideTransition from "./SlideTransition";

export default function Main() {
  const radio = useLofiRadio();
  const { isCardLit, lightCard } = useCardGlow();
  const swipeHandlers = useSwipeNavigation({
    onSwipeDown: radio.previousSong,
    onSwipeLeft: () => radio.changeGif(1),
    onSwipeRight: () => radio.changeGif(-1),
    onSwipeUp: radio.nextSong,
  });

  const backgroundStyle = React.useMemo(
    () => ({
      backgroundImage: `url("${radio.currentGif.url}")`,
    }),
    [radio.currentGif.url]
  );

  return (
    <div
      className={radio.slide ? "main is-sliding" : "main"}
      style={backgroundStyle}
      {...swipeHandlers}
    >
      <GithubLink />
      <div className="overlay"></div>

      <audio
        {...radio.audioHandlers}
        preload="auto"
        src={radio.currentSong.url}
        ref={radio.audioRef}
      />

      <PlayerPanel
        isLit={isCardLit}
        isPlaying={radio.isPlaying}
        moodText={radio.currentMoodText}
        onLight={lightCard}
        onNextSong={radio.nextSong}
        onPlayPause={radio.playPause}
        song={radio.currentSong}
      />

      <SlideTransition isPlaying={radio.isPlaying} slide={radio.slide} />
    </div>
  );
}
