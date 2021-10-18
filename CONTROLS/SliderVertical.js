class SliderVertical{
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        // this.knob = new Knob()
        this.marks = Array.from({length: 30}, (el, i) => {
            return {
                x1: this.x,
                y1: this.y + i * 5,
                x2: this.x + this.w,
                y2: this.y  + i * 5
            }
        })
    }

    render = (col) => {   
        this.marks.forEach(mark => {
            stroke(col)
            line(mark.x1, mark.y1, mark.x2, mark.y2)
        })    
    }
}
