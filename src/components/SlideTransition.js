import PlayerPanel from "./PlayerPanel";

export default function SlideTransition({ isPlaying, slide }) {
  if (!slide) {
    return null;
  }

  return (
    <div className={`slide-transition slide-${slide.direction}`} key={slide.key}>
      <div
        className="slide-frame slide-frame-current"
        style={{ backgroundImage: `url("${slide.fromGif.url}")` }}
      >
        <div className="frame-overlay"></div>
        <PlayerPanel
          isPlaying={isPlaying}
          moodText={slide.fromMoodText}
          song={slide.fromSong}
          visualOnly
        />
      </div>
      <div
        className="slide-frame slide-frame-next"
        style={{ backgroundImage: `url("${slide.toGif.url}")` }}
      >
        <div className="frame-overlay"></div>
        <PlayerPanel
          isPlaying={isPlaying}
          moodText={slide.toMoodText}
          song={slide.toSong}
          visualOnly
        />
      </div>
    </div>
  );
}
