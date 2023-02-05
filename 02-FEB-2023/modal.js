let modal = document.getElementById("modal");
let close = document.getElementsByClassName("close")[0];
let form = document.getElementById("booking-form");
let errorMessage = document.getElementById("error-message");
let successMessage = document.getElementById("success-message");


function bookTable(id){

    let title = document.getElementById("modal-title")
    title.textContent = id;

    console.log(id)
    modal.style.display = "block";

    close.onclick = function() {
        modal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

form.onsubmit = function(event) {
    event.preventDefault();

    // Validate the form
    if (!validateForm()) {
        return;
    }
    successMessage.style.display = "block";
    successMessage.innerHTML = "Table booking successful!";
    
    // Hide success message after 3 seconds
    setTimeout(function() {
        successMessage.style.display = "none";
        // Close the modal
        modal.style.display = "none";

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("date").value = "";
        document.getElementById("time").value = "";
        document.getElementById("party-size").value = "";
    }, 3000);
    

}


// Validate the form
function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let partySize = document.getElementById("party-size").value;

    // Check if name is empty
    if (!name) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Name is required";
        return false;
    }
    
    // Check if email is empty
    if (!email) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Email is required";
        return false;
    }
    
    // Check if email is in correct format
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Email is not in correct format";
        return false;
    }

    // Check if phone number is empty
    if (!phone) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Phone number is required";
        return false;
    }

    // Check if phone number is 10 digits
    if (phone.length !== 10) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Phone number should be 10 digits";
        return false;
    }

    // Check if date is empty
    if (!date) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Date is required";
        return false;
    }
    
    // Check if time is empty
    if (!time) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Time is required";
        return false;
    }
    
    // Check if date and time are ahead of current date and time
    let currentDate = new Date();
    let selectedDate = new Date(date + " " + time);
    if (selectedDate <= currentDate) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Date and time should be ahead of current date and time";
        return false;
    }

        
    // Check if party size is empty
    if (!partySize) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Party size is required";
        return false;
    }
    
    // Check if party size is negative
    if (partySize < 0) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Party size cannot be negative";
        return false;
    }
        
    // If all fields are filled, hide the error message and return true
    errorMessage.style.display = "none";
    return true;
}
        
        
        
        