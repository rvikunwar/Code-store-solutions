var a = 10
function printA(){
    console.log(a) // This will take value 
                //from global value of a defined under var 
}

printA();
console.log(a);



function printB() {
 
    // It can be accessible any
    // where within this function
    var b = 10;
    console.log(b)
}
printB();

// b can be accessible
// outside of function
console.log(b);



let a = 10;
function printAB() {
    let b = 9
    console.log(b); // can't be accessible outside this function - b
    console.log(a); // a is accessible as a is already defined in outer scope
}
printAB();


const a = 10;
function printConstA() {
    a = 9 //Assignment to constant variable, this will give an error 
        //const variables are only defined once.
    console.log(a)
}

printConstA();