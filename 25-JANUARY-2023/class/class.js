//static initialization block
var y = 'Outer y';

class A {
  static field = 'Inner y';
  static {
     var y = this.field;
  }
}

console.log(y, A.y, A.field);


//static 
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
  
    static displayName = "Point";
    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
    
        return Math.hypot(dx, dy);
    }
}
  
const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.displayName; // undefined
p1.distance;    // undefined
p2.displayName; // undefined
p2.distance;    // undefined

console.log(Point.displayName);      // "Point"
console.log(Point.distance(p1, p2)); // 7.0710678118654755



//Inheritance 
class Animal {
    constructor(name) {
      this.name = name;
    }
  
    speak() {
      console.log(`${this.name} makes a noise.`);
    }
  }
  
class Dog extends Animal {
    constructor(name) {
        super(name); // call the super class constructor and pass in the name parameter
}

speak() {
    console.log(`${this.name} barks.`);
}
}

const d = new Dog("Mitzie");
d.speak(); // Mitzie barks


//constructor
class Polygon {
    constructor() {
      this.name = 'Polygon';
    }
}
  
const poly1 = new Polygon();
  
console.log(poly1.name);

