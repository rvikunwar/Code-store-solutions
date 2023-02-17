var modal = document.getElementById("modal");
var close = document.getElementsByClassName("close")[0];
var form = document.getElementById("booking-form");
var tableName;
function tableValidation(name) {
    tableName = name;
    var tableIndex = tables.findIndex(function (item) { return item.name === name; });
    if (tableIndex === -1) {
        renderMessage("Table is not available", "#B81606");
        return false;
    }
    else {
        if (tables[tableIndex]['numberOfTables'] === 0) {
            renderMessage("Table is not available", "#B81606");
            return false;
        }
    }
    return true;
}
function bookTable(id) {
    if (!tableValidation(id))
        return; //for checking availability of tables
    var title = document.getElementById("modal-title");
    if (title !== null) {
        title.textContent = id;
    }
    if (modal !== null) {
        modal.style.display = "flex";
    }
    close.onclick = function () {
        if (modal !== null) {
            modal.style.display = "none";
        }
    };
}
window.onclick = function (event) {
    if (event.target == modal && modal !== null) {
        modal.style.display = "none";
    }
};
if (form !== null) {
    form.onsubmit = function (event) {
        event.preventDefault();
        // Validate the form
        var msg = validateForm();
        if (msg !== "") {
            renderMessage(msg, "#B81606");
            return;
        }
        renderMessage("Table booking successful!", "#06B852");
        modal !== null && (modal.style.display = "none");
        // Clearing input fields
        var ids = ["name", "email", "phone", "date", "time", "party-size"];
        ids.forEach(function (item) {
            var ele = document.getElementById(item);
            if (ele !== null && ele instanceof HTMLInputElement) {
                ele.value = "";
            }
        });
        //for reserving booking
        var tableIndex = tables.findIndex(function (item) { return item.name === tableName; });
        tables[tableIndex]['numberOfTables']--;
    };
}
// Validate the form
function validateForm() {
    var name = document.getElementById("name");
    var email_ = "";
    var partySize_ = 0;
    var phone_ = 0;
    if (name instanceof HTMLInputElement) {
        name = name.value;
    }
    var email = document.getElementById("email");
    if (email instanceof HTMLInputElement) {
        email_ = email.value;
    }
    var phone = document.getElementById("phone");
    if (phone instanceof HTMLInputElement) {
        phone_ = parseInt(phone.value);
    }
    var date = document.getElementById("date");
    if (date instanceof HTMLInputElement) {
        date = date.value;
    }
    var time = document.getElementById("time");
    if (time instanceof HTMLInputElement) {
        time = time.value;
    }
    var partySize = document.getElementById("party-size");
    if (partySize instanceof HTMLInputElement) {
        partySize_ = parseInt(partySize.value);
    }
    if (!name) {
        return "Name is required";
    }
    // Check if email is empty
    if (!email) {
        return "Email is required";
    }
    // Check if email is in correct format
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email_ !== null) {
        if (!emailRegex.test(email_)) {
            return "Email is not in correct format";
        }
    }
    // Check if phone number is empty
    if (!phone) {
        return "Phone number is required";
    }
    // Check if phone number is 10 digits
    if (String(phone_).length !== 10) {
        return "Phone number should be 10 digits";
    }
    // Check if date is empty
    if (!date) {
        return "Date is required";
    }
    // Check if time is empty
    if (!time) {
        return "Time is required";
    }
    // Check if date and time are ahead of current date and time
    var currentDate = new Date();
    var selectedDate = new Date(date + " " + time);
    if (selectedDate <= currentDate) {
        return "Date and time should be ahead of current date and time";
    }
    // Check if party size is empty
    if (!partySize_) {
        return "Party size is required";
    }
    // Check if party size is negative
    if (partySize_ < 0) {
        return "Party size cannot be negative";
    }
    return "";
}
function renderMessage(message, color) {
    var toaster = document.getElementById("toaster");
    var toasterMsg = document.getElementById("toaster-message");
    if (toaster !== null && toasterMsg !== null) {
        toaster.style.display = "block";
        toaster.style.backgroundColor = color;
        toaster.classList.add('fadeAnimation');
        toasterMsg.textContent = message;
        setTimeout(function () {
            if (toaster !== null) {
                toaster.style.display = 'none';
                toaster.classList.remove('fadeAnimation');
            }
        }, 2000);
    }
}
