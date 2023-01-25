//Static

class Calculator {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
    static multiply(a, b) {
        return a * b;
    }
    static divide(a, b) {
        return a / b;
    }
}

console.log(Calculator.add(2, 3)); // 5
console.log(Calculator.subtract(5, 2)); // 3
console.log(Calculator.multiply(3, 4)); // 12
console.log(Calculator.divide(8, 2)); // 4