var Person = /** @class */ (function () {
    function Person(form) {
        this.isError = false;
        if (form !== null) {
            this.errorHandler(form);
            console.log(this.isError, form);
        }
    }
    //for rendering errors in html page
    Person.renderErrorOnHtmlPage = function (errElement, value) {
        if (!(value instanceof File) && !value) {
            if (errElement !== null) {
                errElement.style.display = "block";
                return true;
            }
        }
        return false;
    };
    //checks for age errors
    Person.checkAgeRestrictions = function (errElement, age) {
        if (errElement !== null && age <= 0) {
            errElement.innerHTML = "Age can't be smaller than 0!";
            errElement.style.display = "block";
            return true;
        }
        return false;
    };
    //handles for errors and render error messages on html page
    Person.prototype.errorHandler = function (form) {
        var _this = this;
        var formData = new FormData(form);
        formData.forEach(function (value, name) {
            console.log(name, value);
            var errElement = document.getElementById("".concat(name, "Error"));
            var errorCheck = Person.renderErrorOnHtmlPage(errElement, value);
            if (errorCheck === true) {
                _this.isError = true;
            }
            else if (name !== "age") {
                _this[name] = value;
            }
            if (value && name == "age" && !(value instanceof File)) {
                var value_ = parseInt(value);
                var errorCheck_1 = Person.checkAgeRestrictions(errElement, value_);
                if (errorCheck_1 === true) {
                    _this.isError = true;
                }
                else {
                    _this.age = value_;
                }
            }
        });
        return false;
    };
    //submits data
    Person.showUsers = function (person) {
        var element = document.getElementById("usersId");
        console.log(element, person, 'element');
        if (element != null) {
            element.innerHTML += renderPersonData(person.fname, person.lname, person.email, person.age);
        }
    };
    return Person;
}());
var renderPersonData = function (firstName, lastName, email, age) {
    var dataBox = "<section class='dataBox'>\n        <div class='row'><h4>First name</h4>: ".concat(firstName, "</div>\n        <div class='row'><h4>Last name</h4>: ").concat(lastName, "</div>\n        <div class='row'><h4>Email</h4>: ").concat(email, "</div>\n        <div class='row'><h4>Age</h4>: ").concat(age, "</div></section>");
    console.log(dataBox, 'data box');
    return dataBox;
};
//clear error messgaes on html page
var clearErrorMessages = function (id) {
    var err = document.getElementById(id);
    if (err !== null) {
        err.innerHTML = "";
    }
};
var Users = [];
var formSubmitHandler = function () {
    var form = document.getElementById("form");
    if (form instanceof HTMLFormElement && form != null) {
        var person = new Person(form);
        if (!person.isError) {
            Users.push(person);
            var fieldID = ["fname", "lname", "email", "age"];
            fieldID.forEach(function (id) {
                clearFormEnteries(document.getElementById(id));
            });
            Person.showUsers(person);
        }
    }
};
var clearFormEnteries = function (tag) {
    if (tag instanceof HTMLInputElement) {
        tag.value = "";
    }
};
