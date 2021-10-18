class Knob{
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    render(){
        fill([200,0,200])
        rect(this.x, this.y, this.w, this.h)
    }
}