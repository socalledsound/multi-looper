class DropZone{
    constructor(idx, audio, root, height, parent){
        this.parent = parent
        this.idx = idx
        this.height = height
        this.context = audio
        this.root = root
        this.div = document.createElement('div')
        this.addListeners()
        this.addToRoot()
    }
    addListeners(){
        this.div.addEventListener("dragover",function(e){
            //prevents from the page from reloading when the file is dropped in
                e.preventDefault();
            },false);
        this.div.addEventListener('drop',(e) => {
            
                console.log(e);
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                // you can see what the file looks like in the console
                console.log(file);
                // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
                const reader = new FileReader();
                // this is classic weird javascript
                // reader.readAsArrayBuffer runs first and when it loads,
                // the loaded file gets passed in to the function
                reader.onload = (e) => {
                    let array = e.target.result;
                    console.log(array)
                    // this 'context' lets us use the web audio api
                    // it takes in the loaded file and also a callback function  
                    // to run when the audio has been decoded.
                    console.log(this.context)
                    this.context.decodeAudioData(array, (b) => {
                        // get the appropriate track
                        
                        // then we store that buffered data on a track    
                        this.parent.buffer = b;
                        // then we get the PCM data, which we can use to draw the waveform
                        this.parent.soundFileData = b.getChannelData(0);
                        this.parent.hasAudio = true
                        this.div.style.display = 'none'
                        this.div.style.zIndex = "-1";
                        
                    },function(err){
                        console.log('loading failed:', err);
                        alert('loading failed');
                    });
                }
                // this runs first, javascript, LOL
                reader.readAsArrayBuffer(file);

            },false);
        
    }

    addToRoot(){
        this.div.className = 'drop'
        this.div.style.top = `${this.parent.y}px`
        this.div.style.left= `${this.parent.x}px`
        this.div.style.height = `${this.height * 0.75}px`
        this.div.innerText = 'drop a sound file here'
        console.log(this.div)
        this.root.appendChild(this.div)
    }

        
}
