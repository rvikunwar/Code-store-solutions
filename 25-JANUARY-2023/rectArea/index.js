class Area {
    square = (side) => {
        return side * side;
    }
    
    rectangle = (length, width) => {
        return length * width;
    }
    
    triangle = (base, height) => {
        return (base * height);
    }
}

let area = new Area();
console.log(area.square(5)); // 25
console.log(area.rectangle(10, 15)); // 150
console.log(area.triangle(20, 30)); // 300