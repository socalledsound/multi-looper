class PlayButton{
    constructor(x,y,w,h,type){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.defaultColor = [0,200,0,60]
        this.hoverColor = [0,200,0,120]
        this.activeColor = [0,200,0,200]
        this.color = this.defaultColor
        this.type = type
        this.textSize = this.w/4
        
    }

    checkClicked(){

    }

    checkHover(mX, mY){
        // console.log('checking')
        if(mX > this.x &&
            mX < this.x + this.w &&
            mY > this.y &&
            mY < this.y + this.h){
                this.color = this.hoverColor
            }else{
                this.color = this.defaultColor  
            }
    }

    render(){
        fill(this.color)
        noStroke()
        rect(this.x, this.y, this.w, this.h)
        console.log(this.type)
        if(this.type === 'once'){
            fill(0)
            noStroke()
            textSize(this.textSize)
            text('once', this.x + this.textSize/2, this.y + this.h/2)
        } else if(this.type === 'loop'){
            fill(0)
            noStroke()
            textSize(this.textSize)
            text('loop', this.x + this.textSize/2, this.y + this.h/2)
        }
    }
}