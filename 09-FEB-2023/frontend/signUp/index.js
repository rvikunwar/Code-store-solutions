const url = "http://127.0.0.1:3000/v1"
const form  = document.getElementById("form")

form.onsubmit = function(e){
    e.preventDefault();

    const name = document.getElementById(`name`).value;
    const email = document.getElementById(`email`).value;
    const password = document.getElementById(`password`).value;
    const confirmPassword = document.getElementById(`confirmPassword`).value;

    const msg = validation(name, email, password, confirmPassword); 
    if(msg !== ""){
        renderMessage(msg, "#B81606")
        return;
    }
    const user = { name, email, password }

    fetch(`${url}/createInstructor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then((res)=>{
        return res.json();
    })
    .then((res)=>{
        if(res.key === 500){
            renderMessage(res.message, "#B81606")
        } else {
            localStorage.setItem("message", 'Successfully registered')
            document.getElementById(`name`).value = "";
            document.getElementById(`email`).value = "";
            document.getElementById(`password`).value = "";
            document.getElementById(`confirmPassword`).value = "";
            window.location.href = '../signIn/index.html'
        }
    })    
}


function validation(name, email, password, confirmPassword){
    if (!name || name.trim().length === 0) {
        return "Name should not be empty.";
    }

    if (!email || email.trim().length === 0) {
        return "Email should not be empty.";
    }

    if (!password || password.trim().length === 0) {
        return "Password should not be empty.";
    }

    const validationMsg = validatePassword(password);

    if(validationMsg !== ""){
        return validationMsg;
    }

    if (!confirmPassword || confirmPassword.trim().length === 0) {
        return "Confirm Password should not be empty.";
    }

    if (confirmPassword !== password) {
        return "Password and Confirm password should be same";
    }

    return ""
}


function validatePassword(password) {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
  
    let hasLowerCase = false;
    let hasUpperCase = false;
    let hasNumber = false;
    let hasSpecialCharacter = false;
  
    for (let i = 0; i < password.length; i++) {
      let character = password.charAt(i);
  
      if (character >= 'a' && character <= 'z') {
        hasLowerCase = true;
      } else if (character >= 'A' && character <= 'Z') {
        hasUpperCase = true;
      } else if (character >= '0' && character <= '9') {
        hasNumber = true;
      } else {
        hasSpecialCharacter = true;
      }
    }
  
    if (!hasLowerCase) {
      return "Password must contain a lowercase letter.";
    }
  
    if (!hasUpperCase) {
      return "Password must contain an uppercase letter.";
    }
  
    if (!hasNumber) {
      return "Password must contain a number.";
    }
  
    if (!hasSpecialCharacter) {
      return "Password must contain a special character.";
    }
  
    return "";
}
  

//for rendering toaster messages
function renderMessage(message, color){
    let toaster = document.getElementById("toaster");
    toaster.style.display = "block";
    toaster.style.backgroundColor = color;
    toaster.classList.add('fadeAnimation')

    let toasterMsg = document.getElementById("toaster-message");
    toasterMsg.textContent = message;

    setTimeout(()=>{
        toaster.style.display = 'none';
        toaster.classList.remove('fadeAnimation')
    }, 2000)
}
