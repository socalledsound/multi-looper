class Track {
    constructor(i, x,y,w,h, masterContext, root){
            this.id = i
            this.x =  x
            this.y = y
            this.w = w
            this.h = h
            this.controlsOffsetX = this.x + this.w + 10
            this.controlsOffsetY = this.y + 10
            this.waveformOffset = 40
            this.audioContext = masterContext
            this.gainNode = this.audioContext.createGain()
            this.dropZone = new DropZone(this.id, this.audioContext, root, this.h, this)
            this.controls = new Controls(this.controlsOffsetX, this.controlsOffsetY, this.w, this.h)
            this.buffer = null
            this.soundFileData = null
            this.hasAudio = false
            this.clicked = false
            this.clickMarker = null
            this.selecting = false
            this.selectionLength = 0
            this.selectingBox = null
            this.hasSelection = false
            this.selection = null
            this.soundPlaying = false
            this.soundLooping = false
            
        }


        checkClick(mX, mY){
            if( mX > this.x &&
                mX < this.w &&
                mY > this.y &&
                mY < this.y + this.h &&
                this.hasAudio 
                ){
                    return true
                }else{
                    return false
                }
        }

        drawActiveMarker(){
            stroke([220,0,0])
            line(this.clickMarker.x1, this.clickMarker.y1, this.clickMarker.x2, this.clickMarker.y2 )
        }
        
        drawPlaceholder(){  
            fill(255);
            noStroke()
            text(`track ${this.id + 1}`, 20, (this.id + 1) * this.h - 75 );
            stroke(255)
            // line(0, (this.id + 1) * this.h, this.w, (this.id + 1) * this.h); 
        }

        drawSelectingBox(){
            fill(220, 0, 0, 120)
            // console.log(selectingBox.w)
            rect(this.selectingBox.x, this.selectingBox.y, this.selectingBox.w, this.selectingBox.h)
        }

        drawSelection(){
            fill(50, 255, 50, 90)
            rect(this.selection.x, this.selection.y, this.selection.w, this.selection.h)
        }

        drawWaveform(){
            // the sound file data is longer than our x axis so we're
            // only going to use one piece of data for each step
           
            if(this.soundFileData != null){
                const step = Math.ceil( this.soundFileData.length / this.w );
                // get the y position for the track
                const trackOffset = this.h * this.id;
                // scale the amplitude to the track height
                const amp = (this.h / 2); // 200
                
                // this is a nested for loop, we're going to get the loudest 
                // part of each step, for all of the steps (samples) in the file
                for( let i=0; i < this.w; i++ ){
                    // the min and max for each step gets reset
                    let min = 1.0;
                    let max = -1.0;
                    // look at all of the data in the step
                    for( let j=0; j < step; j++) {
                        
                        let datum = this.soundFileData[(i * step) + j]; 
                        // set the lowest and highest values so far
                        if (datum < min){
                            min = datum;
                        }else if(datum > max){
                            max = datum;
                        }
                                   
                    }
                    stroke(255);
                    // draw a rectangle that shows the loudness of this step
                    rect(i + this.waveformOffset, ((1 + min ) * amp) + trackOffset, 1, (Math.max(1, (max-min) * amp )));
                }
            }

        }

        onMouseMove(mX, mY){
            
            this.controls.checkMouse(mX, mY)
        }


        onMouseRelease(){
            this.clicked = false
            this.selecting = false
            this.selectionBox = null
            if(this.selectionLength > 1 || this.selectionLength < -1){
                this.setSelection()
            }
        }

        playSoundOnce = () => {
            
            this.source = this.audioContext.createBufferSource()
            this.source.buffer = this.buffer
            this.gainNode.connect(this.audioContext.destination)
            this.source.connect(this.gainNode)
            this.source.loop = false
            this.source.playbackRate.value = 1.0
            //const selectionOffset = Math.abs(this.w/this.selection.y)%this.buffer.duration
            const selectionOffset = Math.abs(this.selection.y/this.w) * this.buffer.duration
            // const offset = Math.abs(selectionOffset)%this.buffer.duration;
            console.log(selectionOffset)
            this.source.start(0,selectionOffset)
            const CURRENT_TIME = this.audioContext.currentTime
            const duration = Math.abs(this.selection.w/this.w) * this.buffer.duration
            console.log(duration)
            this.gainNode.gain.linearRampToValueAtTime(1, CURRENT_TIME)
            this.gainNode.gain.linearRampToValueAtTime(0, CURRENT_TIME + duration)
            this.soundPlaying = true
            setTimeout(this.resetSoundPlaying, duration * 1000)

        }

        resetSoundPlaying = () => {
            this.soundPlaying = false
            console.log(this.controls)
            this.controls.playOnceButton.setNotPlaying()
            this.controls.playLoopButton.enable()
        }


        playSoundLoop = () => {
            console.log('play sound loop')
            const selectionOffset = Math.abs(this.selection.y/this.w) * this.buffer.duration
            const duration = Math.abs(this.selection.w/this.w) * this.buffer.duration
            this.source = this.audioContext.createBufferSource()
            this.source.buffer = this.buffer
            this.gainNode.connect(this.audioContext.destination)
            this.gainNode.gain.value = 1.0
            this.source.connect(this.gainNode)
            this.source.loopStart = selectionOffset
            this.source.loopEnd = selectionOffset + duration
            this.source.loop = true
            this.source.start(0)
            this.soundLooping = true
            this.source.playbackRate.value = 1.0      
            // const CURRENT_TIME = this.audioContext.currentTime
            
            
        }

        stopSoundLoop = () => {
            this.source.stop()
            this.soundLooping = false
        }


        render(){
            
            if(this.hasAudio){
                this.drawWaveform()
                this.controls.render()
                
                if(this.clicked){
                    this.drawActiveMarker()
                }
                if(this.selecting){
                    this.drawSelectingBox()
                }

                if(this.hasSelection){
                    this.drawSelection()
                }
            }else{
                this.drawPlaceholder()
            }

        }


        setClickMarker(mX){
            this.clicked = true
            this.clickMarker = {
                x1: mX,
                y1: this.h,
                x2: mX,
                y2: this.y
            }
        }

        setSelectingBox(mouseX){  
            this.selectionLength = mouseX - this.clickMarker.x1
            this.selecting = true    
            this.selectingBox =  {
                x: this.clickMarker.x1,
                y: this.clickMarker.y2,
                w: this.selectionLength,
                h: this.clickMarker.y1
            }
        }

        setSelection(){
            this.hasSelection = true
            this.selection =  {
                x: this.clickMarker.x1,
                y: this.clickMarker.y2,
                w: this.selectionLength,
                h: this.clickMarker.y1
            }
        }

        update(mX, mY){
            this.controls.checkMouse(mX, mY)
        }
        
        // loadFile = (e) => {
            
        //         // this event will have the file attached
        //         console.log(e);
        //         e.preventDefault();
        //         const file = e.dataTransfer.files[0];
        //         // you can see what the file looks like in the console
        //         console.log(file);
        //         // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        //         const reader = new FileReader();
        //         // this is classic weird javascript
        //         // reader.readAsArrayBuffer runs first and when it loads,
        //         // the loaded file gets passed in to the function
        //         reader.onload = function(e){
        //             let array = e.target.result;
        //             // this 'context' lets us use the web audio api
        //             // it takes in the loaded file and also a callback function  
        //             // to run when the audio has been decoded.
        //             this.context.decodeAudioData(array,function(b){
        //                 // get the appropriate track
                        
        //                 // then we store that buffered data on a track    
        //                 this.buffer = b;
        //                 // then we get the PCM data, which we can use to draw the waveform
        //                 this.soundFileData = track.buffer.getChannelData(0);
        //                 this.hasAudio = true
                        
        //             },function(err){
        //                 console.log('loading failed:', err);
        //                 alert('loading failed');
        //             });
        //         }
        //         // this runs first, javascript, LOL
        //         reader.readAsArrayBuffer(file);
        //     }
        
    }
