class SliderVertical{
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.defaultColor = [200,200,200,60]
        this.hoverColor = [200,200,200,120]
        this.activeColor = [200,200,200,200]
        this.color = this.defaultColor
        this.knob = new Knob(this.x, this.y + this.h/2, this.w, this.h/12, this.y, this.h)
        this.marks = Array.from({length: 30}, (el, i) => {
            return {
                x1: this.x,
                y1: this.y + i * 5,
                x2: this.x + this.w,
                y2: this.y  + i * 5
            }
        })
    }

    render = () => {   
        this.marks.forEach(mark => {
            stroke(this.color)
            line(mark.x1, mark.y1, mark.x2, mark.y2)
        })  
        this.knob.render()
        
    }

    setHovered(hover){
        this.hovered = hover
        if(this.hovered){
            this.color = this.hoverColor
        }else{
            this.color = this.defaultColor
        }
        this.knob.setHovered(hover)
    }
}
