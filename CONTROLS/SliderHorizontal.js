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
        this.color = this.defaultColor
        this.knob = new Knob(this.x + this.w/4, this.y, this.w/20, this.h, this.x, this.w)
        this.marks = Array.from({length: 60}, (el, i) => {
            return {
                x1: this.x + i * 5,
                y1: this.y,
                x2: this.x + i * 5,
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
        this.knob.render() 
    }
}