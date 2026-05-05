import React from "react";
import songData from "../songData";
import gifsData from "../gifsData";

const SLIDE_DURATION_MS = 460;
const CARD_GLOW_MS = 1400;
const MOOD_TEXTS = [
    "soft heart, loud dreams",
    "you are doing better than you think",
    "tiny steps, big glow",
    "good mood loading...",
    "breathe easy, vibe slowly",
    "main character evening",
    "chai, courage, repeat",
    "a little magic is still magic",
    "keep going, cutie",
    "the night is on your side",
    "low volume, high hopes",
    "smile first, stress later",
    "today still has sparkle",
    "romanticize the pause",
    "your energy is precious",
    "floating through the feeling",
    "heart warm, world softer",
    "new song, new light"
];

function toRawUrl(url){
    return url
        .replace("https://github.com/", "https://raw.githubusercontent.com/")
        .replace("/blob/", "/");
}

export default function Main(){
    const gifsArray = React.useMemo(() => gifsData.gifs, []);
    const songs = React.useMemo(
        () =>
        songData.songs.map(s => ({ ...s, url: toRawUrl(s.url) }))
        ,[]
    );
    const pickSong = React.useCallback((excludeUrl) => {
        const randomNumber = Math.floor(Math.random() * songs.length);
        const song = songs[randomNumber];

        return song.url === excludeUrl
            ? songs[(randomNumber + 1) % songs.length]
            : song;
    }, [songs]);
    const [gifIndex, setGifIndex] = React.useState(
        () => Math.floor(Math.random() * gifsArray.length)
    );
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [, setIsBuffering] = React.useState(false);
    const [currentSong, setCurrentSong] = React.useState(() => pickSong());
    const [queuedSong, setQueuedSong] = React.useState(() => pickSong(currentSong.url));
    const audioElm = React.useRef();
    const previousSongUrl = React.useRef(currentSong.url);
    const songHistory = React.useRef([]);
    const swipeStart = React.useRef(null);
    const slideTimer = React.useRef();
    const cardGlowTimer = React.useRef();
    const gif = gifsArray[gifIndex];
    const gifsUrl = React.useMemo(() => gifsArray.map((g)=> g.url ), [gifsArray]);
    const [slide, setSlide] = React.useState(null);
    const [moodIndex, setMoodIndex] = React.useState(
        () => Math.floor(Math.random() * MOOD_TEXTS.length)
    );
    const [isCardLit, setIsCardLit] = React.useState(false);
    const moodText = MOOD_TEXTS[moodIndex];
 
    React.useEffect(()=>{
        if(!audioElm.current){
            return;
        }

        if(previousSongUrl.current !== currentSong.url){
            setIsBuffering(true);
            audioElm.current.load();
            previousSongUrl.current = currentSong.url;
        }

        if(isPlaying){
            audioElm.current.play().catch(() => setIsPlaying(false));
        }
        else{
            audioElm.current.pause();
        }
    },[currentSong.url, isPlaying])

    React.useEffect(() => {
        if(!queuedSong){
            return;
        }

        const nextAudio = new Audio();
        nextAudio.preload = "auto";
        nextAudio.src = queuedSong.url;
        nextAudio.load();

        return () => {
            nextAudio.src = "";
        };
    }, [queuedSong]);

    const cacheImages = async(srcArray)=>{
        const promises =  srcArray.map(
            (src)=>{
                return new Promise(function(resolve,reject){
                    const img = new Image();
                    img.src=src;
                    img.onload = resolve;
                    img.onerror = reject;
                });
            }
        );
        await Promise.all(promises);
    }

    React.useEffect(()=>{
        cacheImages(gifsUrl).catch(() => {});
    },[gifsUrl])

    React.useEffect(() => {
        return () => {
            clearTimeout(slideTimer.current);
            clearTimeout(cardGlowTimer.current);
        };
    }, []);

    const getNextGifIndex = React.useCallback((direction) => (
        gifIndex + direction + gifsArray.length
    ) % gifsArray.length, [gifIndex, gifsArray.length])

    const getNextMoodIndex = React.useCallback((direction) => (
        moodIndex + direction + MOOD_TEXTS.length
    ) % MOOD_TEXTS.length, [moodIndex])

    const startSlide = React.useCallback((direction, fromSong, toSong, fromGifIndex, toGifIndex, fromMoodIndex, toMoodIndex) => {
        clearTimeout(slideTimer.current);
        setSlide({
            direction,
            fromSong,
            toSong,
            fromGif: gifsArray[fromGifIndex],
            toGif: gifsArray[toGifIndex],
            fromMoodText: MOOD_TEXTS[fromMoodIndex],
            toMoodText: MOOD_TEXTS[toMoodIndex],
            key: Date.now()
        });
        slideTimer.current = setTimeout(() => {
            setSlide(null);
        }, SLIDE_DURATION_MS);
    }, [gifsArray])

    const lightCard = React.useCallback(() => {
        clearTimeout(cardGlowTimer.current);
        setIsCardLit(true);
        cardGlowTimer.current = setTimeout(() => {
            setIsCardLit(false);
        }, CARD_GLOW_MS);
    }, [])

    const nextSong = React.useCallback(() => {
        const next = queuedSong && queuedSong.url !== currentSong.url
            ? queuedSong
            : pickSong(currentSong.url);
        const nextGifIndex = getNextGifIndex(1);
        const nextMoodIndex = getNextMoodIndex(1);

        songHistory.current = [...songHistory.current, currentSong].slice(-24);
        startSlide("up", currentSong, next, gifIndex, nextGifIndex, moodIndex, nextMoodIndex);
        setCurrentSong(next);
        setQueuedSong(pickSong(next.url));
        setGifIndex(nextGifIndex);
        setMoodIndex(nextMoodIndex);
        setIsPlaying(true)
    }, [currentSong, getNextGifIndex, getNextMoodIndex, gifIndex, moodIndex, pickSong, queuedSong, startSlide])

    const previousSong = React.useCallback(() => {
        const previous = songHistory.current.pop() || pickSong(currentSong.url);
        const nextGifIndex = getNextGifIndex(-1);
        const nextMoodIndex = getNextMoodIndex(-1);

        startSlide("down", currentSong, previous, gifIndex, nextGifIndex, moodIndex, nextMoodIndex);
        setCurrentSong(previous);
        setQueuedSong(pickSong(previous.url));
        setGifIndex(nextGifIndex);
        setMoodIndex(nextMoodIndex);
        setIsPlaying(true)
    }, [currentSong, getNextGifIndex, getNextMoodIndex, gifIndex, moodIndex, pickSong, startSlide])

    const changeGif = React.useCallback((direction) => {
        const nextGifIndex = getNextGifIndex(direction);
        const nextMoodIndex = getNextMoodIndex(direction);
        const slideDirection = direction > 0 ? "left" : "right";

        startSlide(slideDirection, currentSong, currentSong, gifIndex, nextGifIndex, moodIndex, nextMoodIndex);
        setGifIndex(nextGifIndex);
        setMoodIndex(nextMoodIndex);
    }, [currentSong, getNextGifIndex, getNextMoodIndex, gifIndex, moodIndex, startSlide])

    const playPause=()=>{
        setIsPlaying(prevIsPlaying => !prevIsPlaying)
    }

    const myStyle = React.useMemo(() => ({
        backgroundImage:'url("' + gif.url+ '")'
    }), [gif.url])
    const handlePointerDown = (event) => {
        if(event.target.closest("button, a")){
            return;
        }

        event.currentTarget.setPointerCapture?.(event.pointerId);

        swipeStart.current = {
            x: event.clientX,
            y: event.clientY,
            time: Date.now()
        };
    }

    const handlePointerUp = (event) => {
        if(!swipeStart.current){
            return;
        }

        const start = swipeStart.current;
        swipeStart.current = null;

        const deltaX = event.clientX - start.x;
        const deltaY = event.clientY - start.y;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        const swipeDistance = 46;
        const swipeTime = 900;

        if(Date.now() - start.time > swipeTime || Math.max(absX, absY) < swipeDistance){
            return;
        }

        if(absY > absX){
            if(deltaY < 0){
                nextSong();
            }
            else{
                previousSong();
            }
            return;
        }

        changeGif(deltaX < 0 ? 1 : -1);
    }

    const handlePointerCancel = () => {
        swipeStart.current = null;
    }

    const renderPanel = (song, visualOnly = false, panelMoodText = moodText) => (
        <div
            aria-hidden={visualOnly}
            className={
                `${visualOnly ? "glass-container player-panel visual-panel" : "glass-container player-panel live-panel"}${isCardLit && !visualOnly ? " is-lit" : ""}`
            }
            onPointerDown={visualOnly ? undefined : lightCard}
        >
            <p className="kicker">Puff Stuff Radio</p>
            <h1 className="song-title">{song.name}</h1>
            <p className="signal-text">{panelMoodText}</p>
            <div className="controls">
                <button
                    className="control-button primary"
                    type="button"
                    onClick={visualOnly ? undefined : playPause}
                    aria-label={isPlaying ? "Pause song" : "Play song"}
                    tabIndex={visualOnly ? -1 : undefined}
                >
                    <i className={isPlaying ? "fa fa-pause" : "fa fa-play"}></i>
                </button>
                <button
                    className="control-button secondary"
                    type="button"
                    onClick={visualOnly ? undefined : nextSong}
                    aria-label="Play next song"
                    tabIndex={visualOnly ? -1 : undefined}
                >
                    <i className="fa fa-step-forward"></i>
                </button>
            </div>
        </div>
    )


    return(
     <div
        className={slide ? "main is-sliding" : "main"}
        style={myStyle}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
     >
         <a href="https://github.com/ARJUN300399/lofi"><i  className="fa fa-github icon faa-horizontal animated "></i> </a>
         <div className="overlay"></div>
         <audio
            onCanPlay={() => setIsBuffering(false)}
            onEnded={nextSong}
            onError={nextSong}
            onLoadStart={() => setIsBuffering(true)}
            onPlaying={() => setIsBuffering(false)}
            onWaiting={() => setIsBuffering(true)}
            preload="auto"
            src={currentSong.url}
            ref={audioElm}
         />
         {renderPanel(currentSong)}
         {slide && (
            <div className={`slide-transition slide-${slide.direction}`} key={slide.key}>
                <div className="slide-frame slide-frame-current" style={{ backgroundImage: `url("${slide.fromGif.url}")` }}>
                    <div className="frame-overlay"></div>
                    {renderPanel(slide.fromSong, true, slide.fromMoodText)}
                </div>
                <div className="slide-frame slide-frame-next" style={{ backgroundImage: `url("${slide.toGif.url}")` }}>
                    <div className="frame-overlay"></div>
                    {renderPanel(slide.toSong, true, slide.toMoodText)}
                </div>
            </div>
         )}
     </div>
     
    )
}
