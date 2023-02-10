const url = "http://127.0.0.1:3000/v1"
const form  = document.getElementById("form")

window.addEventListener("pageshow", function(event) {

    const msg = localStorage.getItem('message');
    if(msg){
        renderMessage(msg, "#06B852")
        localStorage.removeItem('message')
    }
    let accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      // Redirect to login page if not authenticated
      window.location.href = '../index.html'
    }
});


//for submitting form 
form.onsubmit = function(e){
    e.preventDefault();

    let email = document.getElementById(`email`).value;
    let password = document.getElementById(`password`).value;

    const msg = validation(email, password); 
    if(msg !== ""){
        renderMessage(msg, "#B81606")
        return;
    }
    const user = { email, password }

    fetch(`${url}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then((res)=>{
        return res.json();
    })
    .then((res)=>{
        console.log(res, 'res data')
        if(res.key === 500){
            renderMessage(res.message, "#B81606")
        } else {
            localStorage.setItem('accessToken', res.response.accessToken)

            document.getElementById(`email`).value = "";
            document.getElementById(`password`).value = "";
            localStorage.setItem('message', 'Successfully logged in')
            window.location.href = '../index.html'

        }
    })
    
}


function validation(email, password){

    if (!email || email.trim().length === 0) {
        return "Email should not be empty.";
    }

    if (!password || password.trim().length === 0) {
        return "Password should not be empty.";
    }

    return ""
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
