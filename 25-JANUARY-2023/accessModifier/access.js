
//using private member in js
class Vehicle {
    #name = 'ford';
    getName = function() {
        return this.#name;	
    };
}

var v = new Vehicle();

console.log(v.getName())



//using public member in js
class Vehicle1 {
    name = 'ford';
    getName = function() {
        return this.name;	
    };
}

var v = new Vehicle1();

console.log(v.name, v.getName())