class SliderHorizontal{
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        // this.knob = new Knob()
        this.marks = Array.from({length: 60}, (el, i) => {
            return {
                x1: this.x + i * 5,
                y1: this.y,
                x2: this.x + i * 5,
                y2: this.y + this.h
            }
        })
    }

    render = (col) => {   
        this.marks.forEach(mark => {
            stroke(col)
            line(mark.x1, mark.y1, mark.x2, mark.y2)
        })   
        fill(col)
        noStroke()
        rect(this.x + this.w/4, this.y, this.w/20, this.h) 
    }
}