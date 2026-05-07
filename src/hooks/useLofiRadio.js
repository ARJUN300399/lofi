import React from "react";
import { SONG_HISTORY_LIMIT } from "../config/player";
import moodTexts from "../content/moodTexts";
import { gifs, songs } from "../data/library";
import {
  getCircularIndex,
  pickDifferentSong,
  preloadImages,
} from "../utils/media";
import { useSlideTransition } from "./useSlideTransition";

export function useLofiRadio() {
  const audioRef = React.useRef();
  const [gifIndex, setGifIndex] = React.useState(() =>
    Math.floor(Math.random() * gifs.length)
  );
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [, setIsBuffering] = React.useState(false);
  const [currentSong, setCurrentSong] = React.useState(() =>
    pickDifferentSong(songs)
  );
  const [queuedSong, setQueuedSong] = React.useState(() =>
    pickDifferentSong(songs, currentSong.url)
  );
  const [moodIndex, setMoodIndex] = React.useState(0);
  const previousSongUrl = React.useRef(currentSong.url);
  const songHistory = React.useRef([]);
  const { slide, startSlide } = useSlideTransition(gifs);

  const getNextGifIndex = React.useCallback(
    (direction = 1) => getCircularIndex(gifIndex, direction, gifs.length),
    [gifIndex]
  );

  const getNextMoodIndex = React.useCallback(
    (direction = 1) => getCircularIndex(moodIndex, direction, moodTexts.length),
    [moodIndex]
  );

  const pickSong = React.useCallback(
    (excludedUrl) => pickDifferentSong(songs, excludedUrl),
    []
  );

  React.useEffect(() => {
    const audio = audioRef.current;

    if (!audio || previousSongUrl.current === currentSong.url) {
      return;
    }

    previousSongUrl.current = currentSong.url;
    audio.load();
    setIsBuffering(true);

    if (isPlaying) {
      audio
        .play()
        .then(() => setIsBuffering(false))
        .catch(() => {
          setIsPlaying(false);
          setIsBuffering(false);
        });
    }
  }, [currentSong.url, isPlaying]);

  React.useEffect(() => {
    if (!queuedSong) {
      return;
    }

    const nextAudio = new Audio();
    nextAudio.preload = "auto";
    nextAudio.src = queuedSong.url;
    nextAudio.load();
  }, [queuedSong]);

  React.useEffect(() => {
    preloadImages(gifs.map((gif) => gif.url));
  }, []);

  const nextSong = React.useCallback(() => {
    const fromSong = currentSong;
    const fromGifIndex = gifIndex;
    const fromMoodIndex = moodIndex;
    const toSong = queuedSong || pickSong(currentSong.url);
    const toGifIndex = getNextGifIndex(1);
    const toMoodIndex = getNextMoodIndex(1);

    songHistory.current = [currentSong, ...songHistory.current].slice(
      0,
      SONG_HISTORY_LIMIT
    );
    setCurrentSong(toSong);
    setQueuedSong(pickSong(toSong.url));
    setGifIndex(toGifIndex);
    setMoodIndex(toMoodIndex);
    startSlide({
      direction: "up",
      fromGifIndex,
      fromMoodIndex,
      fromSong,
      toGifIndex,
      toMoodIndex,
      toSong,
    });
  }, [
    currentSong,
    getNextGifIndex,
    getNextMoodIndex,
    gifIndex,
    moodIndex,
    pickSong,
    queuedSong,
    startSlide,
  ]);

  const previousSong = React.useCallback(() => {
    const previousSong = songHistory.current[0];

    if (!previousSong) {
      return;
    }

    const fromSong = currentSong;
    const fromGifIndex = gifIndex;
    const fromMoodIndex = moodIndex;
    const toGifIndex = getNextGifIndex(-1);
    const toMoodIndex = getNextMoodIndex(-1);

    songHistory.current = songHistory.current.slice(1);
    setCurrentSong(previousSong);
    setQueuedSong(pickSong(previousSong.url));
    setGifIndex(toGifIndex);
    setMoodIndex(toMoodIndex);
    startSlide({
      direction: "down",
      fromGifIndex,
      fromMoodIndex,
      fromSong,
      toGifIndex,
      toMoodIndex,
      toSong: previousSong,
    });
  }, [
    currentSong,
    getNextGifIndex,
    getNextMoodIndex,
    gifIndex,
    moodIndex,
    pickSong,
    startSlide,
  ]);

  const changeGif = React.useCallback(
    (direction) => {
      const fromGifIndex = gifIndex;
      const fromMoodIndex = moodIndex;
      const toGifIndex = getNextGifIndex(direction);
      const toMoodIndex = getNextMoodIndex(direction);

      setGifIndex(toGifIndex);
      setMoodIndex(toMoodIndex);
      startSlide({
        direction: direction > 0 ? "left" : "right",
        fromGifIndex,
        fromMoodIndex,
        fromSong: currentSong,
        toGifIndex,
        toMoodIndex,
        toSong: currentSong,
      });
    },
    [
      currentSong,
      getNextGifIndex,
      getNextMoodIndex,
      gifIndex,
      moodIndex,
      startSlide,
    ]
  );

  const playPause = React.useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      setIsBuffering(true);
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsBuffering(false);
        })
        .catch(() => setIsBuffering(false));
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }, []);

  const audioHandlers = React.useMemo(
    () => ({
      onCanPlay: () => setIsBuffering(false),
      onEnded: nextSong,
      onError: () => {
        setIsBuffering(false);
        nextSong();
      },
      onLoadStart: () => setIsBuffering(true),
      onPlaying: () => {
        setIsPlaying(true);
        setIsBuffering(false);
      },
      onWaiting: () => setIsBuffering(true),
    }),
    [nextSong]
  );

  return {
    audioHandlers,
    audioRef,
    changeGif,
    currentGif: gifs[gifIndex],
    currentMoodText: moodTexts[moodIndex],
    currentSong,
    isPlaying,
    nextSong,
    playPause,
    previousSong,
    slide,
  };
}
