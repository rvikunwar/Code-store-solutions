function PrototypicalGreeting(greeting = "Hello", name = "World") {
    this.greeting = greeting
    this.name = name
  }
  
PrototypicalGreeting.prototype.greet = function() {
    return `${this.greeting}, ${this.name}!`
}
  
const greetProto = new PrototypicalGreeting("Hey", "world")
console.log(greetProto.greet())


class ClassicalGreeting {
constructor(greeting = "Hello", name = "World") {
    this.greeting = greeting
    this.name = name
}

greet() {
    return `${this.greeting}, ${this.name}!`
}
}

const classyGreeting = new ClassicalGreeting("Hey", "world")

console.log(classyGreeting.greet())





function makeFunc() {
    const name = '';
    function displayName() {
      console.log(name);
    }
    return displayName;
}
  
const myFunc = makeFunc();
myFunc();