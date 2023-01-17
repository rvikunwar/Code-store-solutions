let form = document.getElementById("form")
let output = document.getElementById("output")

output.style.display = "none"

const label = {
    "firstName": "First Name",
    "lastName": "Last Name",
    "age": "age",
    "gender": "gender"
}

const showData = () => {
    output.style.display = "block"
    const formData = new FormData(form)

    for (const [key, value] of formData) {
        output.innerHTML += (`${label[key]}: <span style="color:grey;">${value??"N/A"}</span>\n<br/>`);
    }
    form.style.display= "none";
}