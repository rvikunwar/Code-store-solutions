class Person{
    fname: string;
    lname: string;
    email: string;
    age: number;
    isError = false;

    constructor(form: HTMLFormElement|null){
        if(form !== null){
            this.errorHandler(form);
            console.log(this.isError, form)
        }
    }

    //for rendering errors in html page
    static renderErrorOnHtmlPage(errElement: HTMLSpanElement|null, 
        value: number|string|File|null): boolean{

        if(!(value instanceof File) && !value){
            if(errElement !== null){
                errElement.style.display = "block"
                return true
            }
        }
        return false;
    }

    //checks for age errors
    static checkAgeRestrictions(errElement: HTMLSpanElement|null, age: number): boolean{
        if(errElement !== null && age <= 0){
            errElement.innerHTML = "Age can't be smaller than 0!"
            errElement.style.display = "block"
            return true
        }
        return false;
    }

    //handles for errors and render error messages on html page
    errorHandler(form: HTMLFormElement): boolean{


        let formData = new FormData(form);
        formData.forEach((value, name) => {
            console.log(name, value)
            
            let errElement = document.getElementById(`${name}Error`)
            let errorCheck = Person.renderErrorOnHtmlPage(errElement, value);
            if(errorCheck === true){
                this.isError = true;
            } else if( name !== "age"){
                this[name] = value;
            }

            if(value && name == "age" && !(value instanceof File)){
                let value_ = parseInt(value);
                let errorCheck = Person.checkAgeRestrictions(errElement, value_);
                if(errorCheck === true){
                    this.isError = true;
                } else {
                    this.age = value_;
                }
            }
        })
        return false;
    }

    //submits data
    static showUsers(person: Person): void{
        let element  = document.getElementById("usersId")
        console.log(element, person, 'element')
        if(element != null){
            element.innerHTML += renderPersonData(person.fname, person.lname, person.email, person.age)
        }
    }
}

var renderPersonData = (firstName: string, lastName: string, email: string, age: number): string => {
    let dataBox = `<section class='dataBox'>
        <div class='row'><h4>First name</h4>: ${firstName}</div>
        <div class='row'><h4>Last name</h4>: ${lastName}</div>
        <div class='row'><h4>Email</h4>: ${email}</div>
        <div class='row'><h4>Age</h4>: ${age}</div></section>`
        console.log(dataBox, 'data box')
    return dataBox;
}

//clear error messgaes on html page
var clearErrorMessages = (id: string) => {
    let err = document.getElementById(id);
    if(err !== null){
        err.innerHTML = "";
    }
}

var Users : Person[] = [];
var formSubmitHandler = () => {
    let form = document.getElementById("form");
    if(form instanceof HTMLFormElement && form != null){
        let person = new Person(form);
        if(!person.isError){
            Users.push(person);
            let fieldID = ["fname", "lname", "email", "age"]
            fieldID.forEach((id)=>{
                clearFormEnteries(document.getElementById(id))
            })
            Person.showUsers(person);
        }
    }
}

var clearFormEnteries = (tag: HTMLElement|null):void => {
    if(tag instanceof HTMLInputElement){
        tag.value = ""
    }
}