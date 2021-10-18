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


function checkClick(mX, mY, track){
    if( mX > track.x &&
        mX < track.w &&
        mY > track.y &&
        mY < track.y + track.h &&
        track.hasAudio 
        ){
            return true
        }else{
            return false
        }
}


function mousePressed(){
    console.log(mouseX)
    tracks.forEach(track => {
        if(checkClick(mouseX, mouseY, track)){
            console.log('clicked')
            track.setClickMarker(mouseX, mouseY, track)
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



