console.log("Welcome to Beatify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Ayra Starr", filePath: "songs/1.mp3.mp3", coverPath: "covers/1.jpg"},
    {songName: "HAUSA", filePath: "songs/2.mp3.mp3", coverPath: "covers/2.jpg"},
    {songName: "Kizz Daniel", filePath: "songs/3.mp3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Kofi Bruce", filePath: "songs/4.mp3.mp3", coverPath: "covers/4.jpg"},
    {songName: "Omah Lay", filePath: "songs/5.mp3.mp3", coverPath: "covers/5.jpg"},
    {songName: "omah Lay", filePath: "songs/6.mp3.mp3", coverPath: "covers/6.jpg"},
    {songName: "Rema", filePath: "songs/7.mp3.mp3", coverPath: "covers/7.jpg"},
    {songName: "Seyi Vibez", filePath: "songs/8.mp3.mp3", coverPath: "covers/8.jpg"},
    {songName: "Smatt Kinzy", filePath: "songs/9.mp3.mp3", coverPath: "covers/9.jpg"},
    {songName: "Feel Good-Syn Cole", filePath: "songs/10.mp3.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})


// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const initializeSongItems = () => {
    songItems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
        element.getElementsByClassName("songItemPlay")[0].addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = i;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            playSong();
        });
    });
};

// Function to make all plays inactive
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Initialize song items
initializeSongItems();