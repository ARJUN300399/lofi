import React, { useState } from "react";
import songData from "../songData";
import gifsData from "../gifsData";
import Spinner from "./spinner";

function toRawUrl(url){
    return url
        .replace("https://github.com/", "https://raw.githubusercontent.com/")
        .replace("/blob/", "/");
}

export default function Main(){
    
    
    const [songs, setSongs] = React.useState(
        songData.songs.map(s => ({ ...s, url: toRawUrl(s.url) }))
    );
    const [gif, setGif] = React.useState(
        gifsData.gifs[Math.floor(Math.random() * 5)]
    );
    const [isLoading, setIsLoading] = React.useState(true);
    const [isPlaying, setIsPlaying] = React.useState(0);
    const [currentSong, setCurrentSong] = React.useState(() => {
        const s = songData.songs[Math.floor(Math.random() * 30)];
        return { ...s, url: toRawUrl(s.url) };
    });
    const audioElm = React.useRef();
    const songArray = songs
    const gifsArray =  gifsData.gifs
    const gifsUrl = gifsArray.map((g)=> g.url )
      
 
    React.useEffect(()=>{
        if(isPlaying){
            audioElm.current.play();
        }
        else{
            audioElm.current.pause();

        }
    },[isPlaying])
    const cacheImages = async(srcArray)=>{
        console.log(srcArray)
        const promises =  srcArray.map(
            (src)=>{
                return new Promise(function(resolve,reject){
                    const img = new Image();
                    img.src=src;
                    img.onload = resolve;
                    img.onerror = reject;
                    console.log(src)
                });
            }
        );
          await Promise.all(promises);
         setIsLoading(false)
    }

    React.useEffect(()=>{
        const images = gifsUrl;
        console.log(images)
        cacheImages(images);
    },[])

    const NextSong =()=>{
        const randomNumber = Math.floor(Math.random() * songArray.length)
        const randomNumberGif = Math.floor(Math.random() * gifsArray.length)
        const newName = songArray[randomNumber].name;
        const newUrl = toRawUrl(songArray[randomNumber].url);
        setCurrentSong(prevSong =>({
            ...prevSong,
            name:newName,
            url:newUrl
        }))
        setIsPlaying(isPlaying+1)
        const newGifUrl = gifsArray[randomNumberGif].url
        setGif(prevGif =>({
            ...prevGif,
            url:newGifUrl
        }))
    }
    const PlayPause=()=>{
        setIsPlaying(!isPlaying)
    }
    const url = 'url(" '+ gif.url+ '")'
    const myStyle={
        backgroundImage:url
    }
    const Style = {
        fontSize:"3rem"
    }


    return(
     <div className="main" onDoubleClick={NextSong} onClick={PlayPause} style={myStyle} >
         <a href="https://github.com/ARJUN300399/lofi"><i  className="fa fa-github icon faa-horizontal animated " style={Style}></i> </a>
         <div className="overlay"></div>
         <audio onEnded={NextSong} src={currentSong.url} ref={audioElm}/>
         <div className="glass-container">
         <div className="container ">
          <div className="text">
             <p>{isPlaying?"":"Happy Journey"}</p>
          </div>
          <div className="text">
             <p>{isPlaying?currentSong.name:"Gaurav Bhai ❤️️"}</p>
          </div>
         </div>
         </div>
     </div>
     
    )
}

