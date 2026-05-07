export default function PlayerPanel({
  isLit = false,
  isPlaying,
  moodText,
  onLight,
  onNextSong,
  onPlayPause,
  song,
  visualOnly = false,
}) {
  const panelClassName = `${visualOnly
    ? "glass-container player-panel visual-panel"
    : "glass-container player-panel live-panel"}${
    isLit && !visualOnly ? " is-lit" : ""
  }`;

  return (
    <div
      className={panelClassName}
      onPointerDown={visualOnly ? undefined : onLight}
      aria-hidden={visualOnly ? true : undefined}
    >
      <p className="kicker">Puff Stuff Radio</p>
      <h1 className="song-title">{song.name}</h1>
      <p className="signal-text">{moodText}</p>
      <div className="controls">
        <button
          type="button"
          className="control-button primary"
          onClick={visualOnly ? undefined : onPlayPause}
          tabIndex={visualOnly ? -1 : undefined}
          aria-label={isPlaying ? "Pause song" : "Play song"}
        >
          <i className={isPlaying ? "fa fa-pause" : "fa fa-play"}></i>
        </button>
        <button
          type="button"
          className="control-button secondary"
          onClick={visualOnly ? undefined : onNextSong}
          tabIndex={visualOnly ? -1 : undefined}
          aria-label="Play next song"
        >
          <i className="fa fa-step-forward"></i>
        </button>
      </div>
    </div>
  );
}
