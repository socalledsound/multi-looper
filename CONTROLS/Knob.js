class Knob{
    constructor(x,y,w,h, sliderMin, sliderWidth){
        this.sliderMin = sliderMin
        this.sliderMax = sliderMin + sliderWidth
        this.x = x
        console.log(this.x, this.sliderMin, this.sliderMax)
        this.y = y
        this.w = w
        this.h = h
        this.clicked = false
        this.clickStartX = null
        this.clickStartY = null
        this.defaultColor = [200,200,200,60]
        this.hoverColor = [80,80,200,220]
        this.activeColor = [220,20,20,200]
        this.color = this.defaultColor
        this.col = this.defaultColor
    }

    checkClick(mX, mY){
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



    render(){
        fill(this.color)
        noStroke()
        rect(this.x, this.y, this.w, this.h)
    }

    setHovered(hover){
        if(!this.clicked){
            if(hover){
                this.color = this.hoverColor
            }else{
                this.color = this.defaultColor
            }
    
        }else{
            this.color = this.activeColor
        }
    }



    setClicked(){
        if(!this.clicked){
            this.clicked = true
            this.color = this.activeColor
            this.clickStartX = this.x
            this.clickStartY = this.y

        }
    }

    resetClicked(){
        console.log('resetting Clicked')
        if(this.clicked){
            this.clicked = false
            this.color = this.defaultColor
            this.clickStartX = null
            this.clickStartY = null

        }
            
    }
    updatePositionX(mX){
        if(this.clickStartX){
            const dX = (mX - this.clickStartX)
            const newVal = this.clickStartX + dX
            console.log(newVal)
            if(newVal > this.sliderMax){
                this.x = this.sliderMax
            }else if(newVal < this.sliderMin){
                this.x = this.sliderMin
            }else{
                console.log(this.x)
                this.x = newVal
            }
              
        }else{
            console.error('there was a problem with clickStart')
        }        
        
    }

    updatePositionY(mY){
        if(this.clickStartY){
            const dY = (mY - this.clickStartY)
            this.y =  this.clickStartY + dY
        }else{
            console.error('there was a problem with clickStart')
        }
    }
    
}