class Controls{
    constructor(x,y,w, h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.playLoopButton = new PlayButton(this.x + this.w * 0.6, this.y + this.h - this.h/2, this.w/7, this.h/6, 'loop')
        this.playOnceButton = new PlayButton(this.x + this.w * 0.4, this.y + this.h - this.h/2, this.w/7, this.h/6, 'once')
        this.pitchControl = new PitchControl(this.x + this.w/3, this.y + this.h - this.h/7, this.w * 0.5, this.h/10)
        this.volumeControl = new VolumeControl(this.x + this.w/6, this.y + this.h/6, this.w/10, this.h * 0.9)
        // this.controls = [this.playLoopButton, this.playOnceButton, this.pitchControl, this.VolumeControl]
        this.controls = [this.playLoopButton, this.playOnceButton, this.pitchControl,this.volumeControl]
    }

    checkMouse(mX,mY){
        // console.log('checking mouse')
         this.controls.forEach(control => control.checkHover(mX, mY))
       
    }

    render(){
        this.controls.forEach(control => control.render())
    }
}