const url = "http://127.0.0.1:3000/v1"

function redirectToStudent(id){
    window.location.href = `./studentPage/main.html?id=${id}`
}

//Update student -- start
function editStudent(id, name, image, className, age, address, rollNo, contactNo, index){
 
    let row = document.getElementById(id);
    row.innerHTML = renderEditingInputForm(id, name, image, className, age, address, rollNo, contactNo, index);
}


function onUpdateStudentHandler(id, index){
    const name = document.getElementById(`name`).value;
    const className = document.getElementById(`className`).value;
    const age = document.getElementById(`age`).value;
    const address = document.getElementById(`address`).value;
    const rollNo = document.getElementById(`rollNo`).value;
    const contactNo = document.getElementById(`contactNo`).value;
    const image = document.getElementById(`image`);

    const msg = validateForm(name, className, age, address, contactNo, rollNo); 
    if(msg !== ""){
        renderMessage(msg, "#B81606")
        return;
    }

    let formdata = new FormData()

    if(image.files.length>0){
        formdata.append('image', image.files[0]) 
    }
    formdata.append('name', name)
    formdata.append('className', className) 
    formdata.append('age', age) 
    formdata.append('address', address) 
    formdata.append('rollNo', rollNo) 
    formdata.append('contactNo', contactNo) 

    fetch(`${url}/updateStudentById/${id}`, {
        method: 'PUT',
        body: formdata
    })
    .then((res)=>{
        return res.json()
    }).then((results) => {
        renderMessage("Successfully updated student", "#06B852")
        handleStudentUpdatedData({ formdata, id, image: results.response.image, index });
        closeAddEditStudentModal()
        // console.log(results, 'updated response');
    })
}


function handleStudentUpdatedData({ id, formdata, image, index }){
    const profileData = {};

    for (const [key, value]  of formdata.entries())
    {
        profileData[key] = value;
    }

    const { name, className, age, address, rollNo, contactNo } = profileData;
    let row = document.getElementById(id);
    row.innerHTML = updatedStudentTableRow(id, name, image, className, age, address, rollNo, contactNo, index);
}

function updatedStudentTableRow( id, name, image, className, age, address, rollNo, contactNo, index ){

    return (
    `	
        <td>${index+1}</td>
        <td class="table-data active-link">${name}</td>
        <td><img class="profile_image" src='http://127.0.0.1:3000/${image}'/></td>
        <td>${className}</td>
        <td>${age}</td>
        <td>${address}</td>
        <td>${rollNo}</td>
        <td>${contactNo}</td>
        <td>
            <i class="fa-solid fa-pen-to-square edit" onclick='editStudent('EDIT',${id}, "${name}", "${image}", "${className}", ${age}, "${address}", ${rollNo}, "${contactNo}", ${index})'></i>
            <i class="fa-solid fa-trash delete"></i>
        </td>
    `
    )
} 
//Update student -- end


//Create student -- start
function addEditStudentModal(status, id, name, image, className, age, address, rollNo, contactNo){
    console.log(status, 'ssss')
    let modal = document.getElementById("modal")
    let modalTitle = document.getElementById("form-title")
    let form  = document.getElementById("form");

    if(status === 'EDIT'){
        modal.style.display = "flex";
        modalTitle.textContent = "Edit student";
        document.getElementById(`name`).value = name;
        document.getElementById(`className`).value = className;
        document.getElementById(`age`).value = age;
        document.getElementById(`address`).value = address;
        document.getElementById(`rollNo`).value = rollNo;
        document.getElementById(`contactNo`).value = contactNo;
        form.onsubmit = (e)=>{
            e.preventDefault()
            onUpdateStudentHandler(id, 0)
        }
    } else {
        modal.style.display = "flex";
        modalTitle.textContent = "Add new student";
        form.onsubmit = (e)=>{
            e.preventDefault()
            onCreateStudentHandler();
        }

    }

}

//table row - for adding new student
function addNewStudentTableRow(){
    return (
    `<tr id="new_row" class="new_update_row">		
        <td class="table-data"></div>
   
        <td class="table-data">
            <input id="name" name="name" placeholder="Name"/>
        </td>

        <td class="table-data">
            <input id="image" name="image" placeholder="Profile image" type="file" accept="image/png, image/jpeg"/>
        </td>

        <td class="table-data">
            <input id="className" name="className" placeholder="Class"/>
        </td>

        <td class="table-data">
            <input id="age"  type="number" placeholder="Age"/>
        </td>

        <td class="table-data">
            <input id="address" type="text" placeholder="Address" />
        </td>

        <td class="table-data">
            <input id="rollNo"  type="text" placeholder="Roll no"/>
        </td>

        <td class="table-data">
            <input name="contactNo" type="text" placeholder="Contact number" id="contactNo"/>
        </td>

        <td class="table-data">
            <input type="submit" onclick='onCreateStudentHandler()'/>
        </td>
    </tr>`
    )
}

function onCreateStudentHandler(){

    const name = document.getElementById(`name`).value;
    const className = document.getElementById(`className`).value;
    const age = document.getElementById(`age`).value;
    const address = document.getElementById(`address`).value;
    const rollNo = document.getElementById(`rollNo`).value;
    const contactNo = document.getElementById(`contactNo`).value;
    const image = document.getElementById(`image`);

    const msg = validateForm(name, className, age, address, contactNo, rollNo); 
    if(msg !== ""){
        renderMessage(msg, "#B81606")
        return;
    }

    let formdata = new FormData()
    formdata.append('image', image.files[0]) 
    formdata.append('name', name)
    formdata.append('className', className) 
    formdata.append('age', age) 
    formdata.append('address', address) 
    formdata.append('rollNo', rollNo) 
    formdata.append('contactNo', contactNo) 

    fetch(`${url}/createStudent`, {
        method: 'POST',
        body: formdata
    })
    .then((res)=>{
        return res.json();
    })
    .then((res)=>{

        let studentRows = document.getElementsByClassName("studentRow");
        console.log(studentRows, 'rows')
        console.log(res)
        renderMessage("Successfully added student", "#06B852")
        handleNewStudentData(formdata, res.response.id, res.response.image, studentRows.length)
        closeAddEditStudentModal()
    })
}

function handleNewStudentData( formdata, id, image, index ){
    const profileData = {};

    for (const [key, value]  of formdata.entries())
    {
        profileData[key] = value;
    }

    const { name, className, age, address, rollNo, contactNo } = profileData;
    let table = document.getElementById("studentTableBody")
    table.innerHTML += renderStudentInTable({ name, image, className, age, address, rollNo, contactNo, id, index })
}


function renderStudentInTable({ id, name, image, className, age, address, rollNo, contactNo, index }){
    return (
    `<tr id=${id} class="studentRow">		
        <td class="table-data">${index+1}</td>
        <td class="table-data active-link" onclick="redirectToStudent(${id})">${name}</td>
        <td class="table-data">${ image?(`<img class="profile_image" src='http://127.0.0.1:3000/${image}'/>`):'N/A'}</td>

        <td class="table-data">${className}</td>
        <td class="table-data">${age}</td>
        <td class="table-data">${address}</td>
        <td class="table-data">${rollNo}</td>
        <td class="table-data">${contactNo}</td>
        <td class="table-data">
            <i class="fa-solid fa-pen-to-square edit" onclick='addEditStudentModal("EDIT", ${id}, "${name}", "${image}", "${className}", ${age}, "${address}", ${rollNo}, "${contactNo}", ${index})'></i>
            <i class="fa-solid fa-trash delete" onclick="deleteStudent(${id})"></i>
        </td>
    </tr>`
    )
} 
//Create student -- end


function getAllStudents(){
    fetch(`${url}/getAllStudents`)
    .then((res) => res.json())
    .then((res) => {
        let table = document.getElementById("studentTableBody")
        
        res.response.forEach((element, index) => {
            // console.log(element, table)
            table.innerHTML += renderStudentInTable({ ...element, index })
        });
        // console.log(res, "STUDENT DATA")
    })
}


function deleteStudent(id){
    fetch(`${url}/deleteStudent/${id}`,{
        method: "DELETE"
    })
    .then((res) => res.json())
    .then((res) => {
        // console.log(res, 'data')
        renderMessage("Successfully deleted", "#06B852")

        let row = document.getElementById(id);
        row.remove();
    })
}

getAllStudents();


//for validation
function validateForm(name, className, age, address, contactNo,  rollNumber) {

    if (!name || name.trim().length === 0) {
        return "Name should not be empty.";
    }

    if (!className || className.trim().length === 0) {
        return "Class name should not be empty.";
    }

    if (isNaN(age) || age < 0) {
        return "Invalid age. Age should be a positive number.";
    }

    if (!address || address.trim().length === 0) {
        return "Address should not be empty.";
    }

    if (!/^\d{10}$/.test(contactNo)) {
      return "Invalid phone number. Phone number should only contain 10 digits.";
    }
  
    if (isNaN(rollNumber) || rollNumber < 0) {
      return "Invalid roll number. Roll number should be a positive number.";
    }

    return "";
}
  

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


function closeAddEditStudentModal() {
    let modal = document.getElementById("modal");
    modal.style.display = 'none';    
}