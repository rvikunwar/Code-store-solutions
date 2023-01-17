let form = document.getElementById("form")
let output = document.getElementById("output")

output.style.display = "none"

const label = {
    "firstName": "First Name",
    "lastName": "Last Name",
    "age": "age",
    "gender": "gender",
    "phone": "Contact number"
}

const showData = () => {
    const formData = new FormData(form)
    subCount = 0;

    for (const [key, value] of formData) {

        if(!value){
            alert(`Please fill ${label[key]??key} field before submitting`)
            output.innerHTML = ""
            return
        }
        if(key === 'subject') {
            subCount++; output.innerHTML += (`${label[key]??key + " " + subCount}: <span style="color:grey;">${value??"N/A"}</span>\n<br/>`);
        } else {
            output.innerHTML += (`${label[key]??key}: <span style="color:grey;">${value??"N/A"}</span>\n<br/>`);
        }
    }
    output.style.display = "block"
    form.style.display= "none";
}