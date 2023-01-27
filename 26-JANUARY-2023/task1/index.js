var myDiv = document.getElementById("myDiv");
console.log(myDiv.innerHTML);  // Output: "Hello World!"


var myElements = document.getElementsByClassName("myClass");
console.log(myElements[0].innerHTML);  // Output: "Hello World!"
console.log(myElements[1].innerHTML);  // Output: "Welcome to the website"

var myElements = document.getElementsByTagName("p");
console.log(myElements[0].innerHTML);  // Output: "Hello World!"
console.log(myElements[1].innerHTML);  // Output: "Welcome to the website"