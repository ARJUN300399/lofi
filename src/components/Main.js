import React from "react";
import songData from "../songData";
import gifsData from "../gifsData";

function toRawUrl(url){
    return url
        .replace("https://github.com/", "https://raw.githubusercontent.com/")
        .replace("/blob/", "/");
}

export default function Main(){
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
    const [gif, setGif] = React.useState(
        () => gifsData.gifs[Math.floor(Math.random() * gifsData.gifs.length)]
    );
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isBuffering, setIsBuffering] = React.useState(false);
    const [currentSong, setCurrentSong] = React.useState(() => pickSong());
    const [queuedSong, setQueuedSong] = React.useState(() => pickSong(currentSong.url));
    const audioElm = React.useRef();
    const previousSongUrl = React.useRef(currentSong.url);
    const gifsArray =  gifsData.gifs;
    const gifsUrl = React.useMemo(() => gifsArray.map((g)=> g.url ), [gifsArray]);
 
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

    const nextSong =()=>{
        const randomNumberGif = Math.floor(Math.random() * gifsArray.length)
        setCurrentSong(prevSong => {
            const next = queuedSong && queuedSong.url !== prevSong.url
                ? queuedSong
                : pickSong(prevSong.url);

            setQueuedSong(pickSong(next.url));
            return next;
        })
        setIsPlaying(true)
        const newGifUrl = gifsArray[randomNumberGif].url
        setGif(prevGif =>({
            ...prevGif,
            url:newGifUrl
        }))
    }

    const playPause=()=>{
        setIsPlaying(prevIsPlaying => !prevIsPlaying)
    }

    const url = 'url("' + gif.url+ '")'
    const myStyle={
        backgroundImage:url
    }
    const Style = {
        fontSize:"3rem"
    }


    return(
     <div className="main" style={myStyle} >
         <a href="https://github.com/ARJUN300399/lofi"><i  className="fa fa-github icon faa-horizontal animated " style={Style}></i> </a>
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
         <div className="glass-container player-panel">
            <p className="kicker">Puff Stuff Radio</p>
            <h1 className="song-title">{currentSong.name}</h1>
            <p className="signal-text">{isBuffering ? "tuning signal..." : isPlaying ? "signal warm" : "tap play to tune in"}</p>
            <div className="controls">
                <button className="control-button primary" type="button" onClick={playPause} aria-label={isPlaying ? "Pause song" : "Play song"}>
                    <i className={isPlaying ? "fa fa-pause" : "fa fa-play"}></i>
                </button>
                <button className="control-button secondary" type="button" onClick={nextSong} aria-label="Play next song">
                    <i className="fa fa-step-forward"></i>
                </button>
            </div>
         </div>
     </div>
     
    )
}
