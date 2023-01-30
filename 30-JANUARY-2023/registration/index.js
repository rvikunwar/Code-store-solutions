let form = document.getElementById("form");

function onSubmitHandler(){
    let formData = new FormData(form);

    for(let [name, value] of formData) {
        try{
            console.log(`${name} = ${value}`); 

            if(!value){
                let err = document.getElementById(`${name}Error`);
                err.style.display = "block"
            }

            if(value && name == "phoneNumber"){
                if(value.length !== 10){
                    let err = document.getElementById(`${name}Error`);
                    err.innerHTML = "Phone number should have value equals to 10 numbers!"
                    err.style.display = "block"
                }
            }

            if(value && name == "birthday"){
                let today = new Date();
                let newDate = new Date(value)

                if(today< newDate){
                    let err = document.getElementById(`${name}Error`);
                    err.innerHTML = "Birth date should be smalller than current date!"
                    err.style.display = "block"
                }
            }
        } catch(err){
            console.log(err)
        }

    }
}


function clearErrorHandler(id){
    let err = document.getElementById(id);
    err.innerHTML = ""
}
