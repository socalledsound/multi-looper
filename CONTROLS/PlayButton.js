class PlayButton{
    constructor(x,y,w,h,type){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.defaultColor = [0,200,0,60]
        this.hoverColor = [0,200,0,120]
        this.activeColor = [0,200,0,200]
        this.disabledColor = [200,200,200,40]
        this.color = this.defaultColor
        this.type = type
        this.textSize = this.w/4
        this.disabled = false
        this.defaultTextColor = 0
        this.disabledTextColor = [20,20,20,200]
        this.activeTextColor = [20,200,20,200]
        this.textColor = this.defaultTextColor
        
    }

    checkClick(mX, mY){
        console.log('checking click')
        if( mX > this.x &&
            mX < this.x + this.w &&
            mY > this.y &&
            mY < this.y + this.h
            
            ){
                return true
            }else{
                return false
            }
    }

    checkHover(mX, mY){
        // console.log('checking')
        if(mX > this.x &&
            mX < this.x + this.w &&
            mY > this.y &&
            mY < this.y + this.h && 
            !this.disabled
            ){
                this.color = this.hoverColor
            }else{
                this.color = this.defaultColor  
            }
    }

    enable(){
        this.disabled = false
        this.color = this.defaultColor
        this.textColor = this.defaultTextColor
    }

    disable(){
        this.disabled = true
        this.color = this.disabledColor
        this.textColor = this.disabledTextColor
    }

    setPlaying(){
        this.disabled = true
        this.color = this.disabledColor
        this.textColor = this.activeTextColor
    }

    setNotPlaying(){
        this.disabled = false
        this.color = this.defaultColor
        this.textColor = this.defaultTextColor
    }

    setLooping(){
        this.disabled = true
        this.color = this.disabledColor
        this.textColor = this.activeTextColor
    }

    setNotLooping(){
        this.disabled = false
        this.color = this.defaultColor
        this.textColor = this.defaultTextColor
    }

    render(){
        fill(this.color)
        noStroke()
        rect(this.x, this.y, this.w, this.h)
      
        if(this.type === 'once'){
            fill(this.textColor)
            noStroke()
            textSize(this.textSize)
            text('once', this.x + this.textSize/2, this.y + this.h/2)
        } else if(this.type === 'loop'){
            fill(this.textColor)
            noStroke()
            textSize(this.textSize)
            text('loop', this.x + this.textSize/2, this.y + this.h/2)
        }
    }
}