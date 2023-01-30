let form = document.getElementById("form");

form.onsubmit = function(e){
    console.log(e, 'data')
    e.preventDefault(); //stops default submission of form
    // return false
}

var child = document.getElementById("childAnchor");

// propagation will be stopped...
child.onclick = function(e) { 
    e.stopPropagation();
    console.log('Stopped the propagation'); 
};

// this message will never be render . . .
child.parentNode.onclick = function(e) { 
    console.log('This message will never get rendered!'); 
};