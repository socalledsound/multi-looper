const root = document.getElementById('root')
//init web audio context
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext;
const context = new AudioContext();
//master gain node
const master = context.createGain();
master.connect(context.destination);
console.log(context)
const CANVASWIDTH = window.innerWidth;
const CANVASHEIGHT = window.innerHeight;
const numTracks = 4;
const TRACKHEIGHT = CANVASHEIGHT/numTracks
const OFFSET_LEFT = 10
const OFFSET_TOP = 10
const tracks = Array.from({length: numTracks}, (el, i) => {
    return new Track(i, OFFSET_LEFT, TRACKHEIGHT * i + OFFSET_TOP, CANVASWIDTH/2 - (2 * OFFSET_LEFT), TRACKHEIGHT - (2 * OFFSET_TOP), context, root)
});


let clickActive = false
let clickMarker
let selecting = false
let selectingBox
let selected = false
let selectionLength = 0
let selectedSection

// NOTE!  the drag and drop functionality is in loadFile.js 
// there's a div in the html file that acts as a drop zone,
// using dragover and drop event listerners.
// it then loads the dropped sound into an audio buffer
// using the FileReader and WebAudio APIs.
// soundFileDatas is an array there that keeps track 
// the buffered sound data of any files that have been droppped in

function setup(){
    createCanvas(CANVASWIDTH, CANVASHEIGHT);
    background(0);
}

function draw(){
    background(0);
    tracks.forEach((track) => {
        track.render()
    })

}


function mousePressed(){
    console.log(mouseX)
    tracks.forEach(track => {
        if(track.checkClick(mouseX, mouseY)){
            // console.log('clicked')
            track.setClickMarker(mouseX, mouseY, track)
        }
        if(track.controls.playOnceButton.checkClick(mouseX, mouseY)){
            if(!track.soundLooping){
                if(!track.soundPlaying){
                    console.log('clicked')
                    track.controls.playOnceButton.setPlaying()
                    track.controls.playLoopButton.disable()
                    track.playSoundOnce()
                } 
            } 
        }
        if(track.controls.playLoopButton.checkClick(mouseX, mouseY)){
            if(!track.soundPlaying){
                if(!track.soundLooping ){
                    track.playSoundLoop()
                    track.controls.playLoopButton.setLooping()
                    track.controls.playOnceButton.disable()
                } else {
                    track.stopSoundLoop()
                    track.controls.playLoopButton.setNotLooping()
                    track.controls.playOnceButton.enable()
                }
            }

        }
    })
      
}


function mouseDragged(){
    tracks.forEach(track => {
        if(track.clicked){
            track.setSelectingBox(mouseX)
        }
    })
}

function mouseMoved(){
    tracks.forEach(track => track.onMouseMove(mouseX, mouseY))
}


function mouseReleased(){
    tracks.forEach(track => {
        track.onMouseRelease()
    })

}



