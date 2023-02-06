let modal = document.getElementById("modal");
let close = document.getElementsByClassName("close")[0];
let form = document.getElementById("booking-form");
let errorMessage = document.getElementById("error-message");
let successMessage = document.getElementById("success-message");
let tableName: string;


function tableValidation(name: string): boolean{
    tableName = name;
    let tableIndex = tables.findIndex((item: TableType) => item.name === name)
    if(tableIndex === -1){
        alert("Table is not available")
        return false;
    } else {
        if(tables[tableIndex]['numberOfTables'] === 0){
            alert("Table is not available")
            return false;
        }
    }

    return true;
}

function bookTable(id){

    if(!tableValidation(id)) return; //for checking availability of tables
    let title = document.getElementById("modal-title") 
    if(title !== null){
        title.textContent = id;
    }

    if(modal !== null){
        modal.style.display = "block"
    }

    close.onclick = function() {
        if(modal !== null){
            modal.style.display = "none";
        }
    }
}

window.onclick = function(event) {
    if (event.target == modal && modal !== null) {
        modal.style.display = "none";
    }
}


if(form !== null){

    form.onsubmit = function(event) {
        event.preventDefault();
    
        // Validate the form
        if (!validateForm()) {
            return;
        }
        if(successMessage !== null){
            successMessage.style.display = "block";
            successMessage.innerHTML = "Table booking successful!";
        }
    
        
        // Hide success message after 3 seconds
        setTimeout(function() {
            successMessage !== null && (successMessage.style.display = "none");
            // Close the modal
            (modal !== null) && (modal.style.display = "none");
           
    
            // Clearing input fields
            let ids: Array<string> = [ "name", "email", "phone", "date", "time", "party-size"];

            ids.forEach((item)=>{
                let ele: HTMLElement|null = document.getElementById(item);
                if(ele !== null && ele instanceof HTMLInputElement){
                    ele.value = ""
                }
            })    

            //for reserving booking
            let tableIndex = tables.findIndex((item: TableType) => item.name === tableName)
            tables[tableIndex]['numberOfTables']--;
        }, 2000);    
    }
}


// Validate the form
function validateForm() {
    let name: string| HTMLElement| null = document.getElementById("name");
    let email_: string = "";
    let partySize_: number = 0;
    let phone_: number = 0;
    
    if(name instanceof HTMLInputElement){
        name = name.value;
    }

    let email: string| HTMLElement| null  = document.getElementById("email");
    if(email instanceof HTMLInputElement){
        email_ = email.value
    }

    let phone: string|number| HTMLElement| null  = document.getElementById("phone");
    if(phone instanceof HTMLInputElement){
        phone_ = parseInt(phone.value);
    }

    let date: Date|number| string| HTMLElement| null  = document.getElementById("date");
    if(date instanceof HTMLInputElement){
        date = date.value;
    }

    let time: Date|string| HTMLElement| null  = document.getElementById("time");
    if(time instanceof HTMLInputElement){
        time = time.value;
    }

    
    let partySize: string|number| HTMLElement| null  = document.getElementById("party-size");
    if(partySize instanceof HTMLInputElement){
        partySize_ = parseInt(partySize.value);
    }

    // Check if name is empty
    if(errorMessage !== null){
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
        if (email_ !== null) {
            if(!emailRegex.test(email_)){
                errorMessage.style.display = "block";
                errorMessage.innerHTML = "Email is not in correct format";
                return false;
            }
        }
    
        // Check if phone number is empty
        if (!phone) {
            errorMessage.style.display = "block";
            errorMessage.innerHTML = "Phone number is required";
            return false;
        }
    
        // Check if phone number is 10 digits
        if (String(phone_).length !== 10) {
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
        if (partySize_ < 0) {
            errorMessage.style.display = "block";
            errorMessage.innerHTML = "Party size cannot be negative";
            return false;
        }
            
        // If all fields are filled, hide the error message and return true
        errorMessage.style.display = "none";
    }
    
    return true;
}
        
        
        
        