class Rectangle{
    constructor(_width, _height, _color){
        console.log("class-rectangle")

        this.width = _width;
        this.height = _height;
        this.color = _color;
    }

    getArea = () => {
        return this.height * this.width;
    }
}


let R = new Rectangle(10, 20, "blue") 