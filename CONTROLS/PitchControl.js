class PitchControl{
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.slider = new SliderHorizontal(this.x, this.y, this.w, this.h)
        this.defaultColor = [200,200,200,60]
        this.hoverColor = [200,200,200,120]
        this.activeColor = [200,200,200,200]
        this.color = this.defaultColor
        this.hovered = false
        
        // this.type = type
        // this.textSize = this.w/4
        
    }

    checkHover(mX, mY){
        // console.log('checkking')
        if(mX > this.x &&
            mX < this.x + this.w &&
            mY > this.y &&
            mY < this.y + this.h){
                this.hovered = true
                this.slider.setHovered(this.hovered)
            }else{
                this.hovered = false  
                this.slider.setHovered(this.hovered)
            }
    }

    onMouseUp(){
        console.log('mouseUpping')
        this.slider.knob.resetClicked()
        
    }

    onMouseDrag(){

    }

    render(){
        this.slider.render()   
    }
}