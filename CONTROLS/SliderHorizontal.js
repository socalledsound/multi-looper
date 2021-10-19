class SliderHorizontal{
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        console.log(this.w)
        this.h = h
        this.defaultColor = [200,200,200,60]
        this.hoverColor = [200,200,200,120]
        this.activeColor = [200,200,200,200]
        this.faderLineColor = [20,20,120,220]
        this.color = this.defaultColor
        this.knob = new Knob(this.x + this.w/2, this.y - 5, this.w/20, this.h + 10, this.x, this.w)
        this.numMarks = 60
        this.marks = Array.from({length: this.numMarks}, (el, i) => {
            return {
                x1: this.x + i * this.w/this.numMarks,
                y1: this.y,
                x2: this.x + i * this.w/this.numMarks,
                y2: this.y + this.h
            }
        })
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


    render = () => {   
        this.marks.forEach(mark => {
            stroke(this.color)
            strokeWeight(1)
            line(mark.x1, mark.y1, mark.x2, mark.y2)
        })   
        stroke(this.faderLineColor)
        strokeWeight(1)
        line(this.x - 5, this.y + this.h/2, this.x + this.w, this.y + this.h/2)
        this.knob.render() 
    }
}