import React from "react";
import songData from "../songData";
import gifsData from "../gifsData";

const SLIDE_DURATION_MS = 460;
const CARD_GLOW_MS = 1400;
const MOOD_TEXTS = [
    "you got this, cutie",
    "you are glowing softly",
    "keep going, cutie",
    "you make slow days sweet",
    "your vibe is precious",
    "you are doing enough",
    "you are allowed to rest",
    "you are the calm tonight",
    "you carry quiet magic",
    "you are a soft win",
    "your heart is still brave",
    "you look good in hope",
    "you deserve easy minutes",
    "you are not behind",
    "you are learning gently",
    "your little steps matter",
    "you make the mood lighter",
    "you are still blooming",
    "you are safe to slow down",
    "you are made of spark",
    "you are a tiny miracle",
    "you have main character calm",
    "your smile can reset the room",
    "you are softer than stress",
    "you can breathe now, cutie",
    "you are doing beautifully",
    "your energy is gold",
    "you deserve this vibe",
    "you are worth the pause",
    "you are a gentle legend",
    "your dreams still know you",
    "you are sunshine after dark",
    "you are the good part",
    "you are better than doubt",
    "you can take it slow",
    "your peace is important",
    "you are loved in small ways",
    "you are becoming brighter",
    "you are cute and capable",
    "you are the plot twist",
    "you have soft power",
    "you are the cozy signal",
    "you made it to this song",
    "you are allowed to smile",
    "you are more than tired",
    "you are not your bad day",
    "you are the calm beat",
    "you bring your own light",
    "you are magic in progress",
    "you are doing your best",
    "you are a little star",
    "you deserve warm moments",
    "you are sweet pressure-free",
    "you are winning quietly",
    "you still have time",
    "you are a whole vibe",
    "you are brave, cutie",
    "you can restart softly",
    "you are enough today",
    "you make silence pretty",
    "you are the night sparkle",
    "you are soft but strong",
    "you deserve softer thoughts",
    "you are a cute comeback",
    "your mood can rise again",
    "you are not too late",
    "you are built for better",
    "you glow in your own tempo",
    "you are a calm masterpiece",
    "you are the sweet frequency",
    "you can do hard things",
    "you deserve a light heart",
    "you are a peaceful storm",
    "you are the warmest note",
    "you are gentle fire",
    "you are still the hero",
    "you are cuter than worry",
    "you are stronger than noise",
    "you matter, cutie",
    "you are becoming you",
    "you are the soft chorus",
    "you deserve nice endings",
    "you are your own safe place",
    "you are allowed to shine",
    "you are a happy little spark",
    "you are steady and sweet",
    "you are the good signal",
    "you are healing in style",
    "you are not alone tonight",
    "you are a mood lifter",
    "you are brave in quiet ways",
    "you deserve calm wins",
    "you are almost there",
    "you are worth cheering for",
    "you are soft lightning",
    "you are doing so well",
    "you are a cute survivor",
    "you can trust your pace",
    "you are made for mornings",
    "you turn songs into memories",
    "you are the soft headline",
    "you deserve little joys",
    "you are a calm kind of cool",
    "you are better than panic",
    "you are still sparkling",
    "you are the vibe, cutie",
    "you can rest without guilt",
    "you are a heart with courage",
    "you are glowing in secret",
    "you deserve warm light",
    "you are the cute upgrade",
    "you are stronger today",
    "you make hope look easy",
    "you are a slow dance",
    "you are not the mess",
    "you are a clean new page",
    "you are enough, promise",
    "you are the pretty pause",
    "you are kind to keep trying",
    "you are the bright side",
    "you carry tiny sunshine",
    "you are a soft anthem",
    "you deserve lighter days",
    "you are the calm after",
    "you are still choosing you",
    "you are a cute little win",
    "you are a dream in motion",
    "you can bloom quietly",
    "you are brave for showing up",
    "you are the sweetest signal",
    "you are pure cozy energy",
    "you are not your doubts",
    "you are a better tomorrow",
    "you are glowing through it",
    "you are the kind moment",
    "you are rare, cutie",
    "you deserve a smooth night",
    "you are doing magic slowly",
    "you are the song's favorite",
    "you are a soft victory",
    "you are safe to be soft",
    "you are still moving forward",
    "you are a tiny festival",
    "you are the warm radio",
    "you are cooler than fear",
    "you are a quiet blessing",
    "you are the glow button",
    "you can begin again",
    "you are a mood in bloom",
    "you deserve good surprises",
    "you are not hard to love",
    "you are the sweet bassline",
    "you are shining anyway",
    "you are the cute answer",
    "you are built from hope",
    "you are a pocket of peace",
    "you deserve easy breathing",
    "you are stronger than yesterday",
    "you are the soft restart",
    "you are the vibe saver",
    "you are a bright little planet",
    "you are the calm color",
    "you can smile again",
    "you are made of moments",
    "you are a gentle comeback",
    "you are enough for now",
    "you are the comfort track",
    "you are winning at your pace",
    "you are the good light",
    "you are cute without trying",
    "you deserve soft music",
    "you are a brave little heart",
    "you are the nicer thought",
    "you are a warm frequency",
    "you are still the sparkle",
    "you are your own magic",
    "you are loved, cutie",
    "you are a calm glow-up",
    "you are the better vibe",
    "you are not done yet",
    "you are light in progress",
    "you can take the next step",
    "you are the cozy moment",
    "you are doing fine, cutie",
    "you are the soft highlight",
    "you are growing beautifully",
    "you deserve a happy pause",
    "you are stronger than the dip",
    "you are sweet and steady",
    "you are the tiny triumph",
    "you are good news waiting",
    "you can float through this",
    "you are the calm sparkle",
    "you are more than enough",
    "you are a glow worth keeping",
    "you deserve the whole vibe",
    "you are the gentle win",
    "you are the music's smile",
    "you are a brave softie",
    "you are tomorrow's favorite"
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
    const [moodIndex, setMoodIndex] = React.useState(0);
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
