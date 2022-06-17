const [song,setSong]=React.useState({
    id:"000",
    name:"Pasoori...",
    songUrl:"https://github.com/ARJUN300399/hello-world/blob/master/pasoorilofi.mp3?raw=true"
})
var songArray = songData.songs
function nextSong(){
    const randomNumber = Math.floor(Math.random()*songArray.length)
    const url = songArray[randomNumber].url
    const id = songArray[randomNumber].id
    const name = songArray[randomNumber].name
    setSong(prevSong=>({
        id:id,
        name:name,
        songUrl:url
    }))
    const sound = new Howl({
        src:song.songUrl,
        html5:true  
    })
    sound.play();
}
