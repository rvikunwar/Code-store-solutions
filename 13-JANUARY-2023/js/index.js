class Person {
    constructor(_name, _age){
        this.name = _name
        this.age = _age
    }

    describe(){
        console.log(`I am ${this.name} and I am ${this.age} years old`);
    }
}


class Programmer extends Person {
    constructor(_name, _age, _yearsOfExperience) {
        super(_name, _age) // calls the constructor of parent class

        this.yearsOfExperience = _yearsOfExperience
    }

    code() {
        console.log(`${this.name} is coding!!!`)
    }
}

let person1 = new Person("Jeff", 22)

let programmer1 = new Programmer("Don", 21, 1)


programmer1.describe()


class Animal {
    constructor(_name){
        this.name = _name;
    }

    makeSound() {
        console.log("Generic animal sound!!")
    }
}


class Dog extends Animal{
    constructor(name){
        super(name);
    }

    makeSound() {
        console.log("Boof! Boof!"); //OVERWRITES THE METHOD OVER PARENT CLASS MEMBER
    }
}


const a1 = new Animal()
const b1 = new Dog()
