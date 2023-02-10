const url = "http://127.0.0.1:3000/v1"

window.addEventListener("pageshow", function(event) {

    const msg = localStorage.getItem('message');
    if(msg){
        renderMessage(msg, "#06B852")
        localStorage.removeItem('message')
    }
    let accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      // Redirect to login page if not authenticated
      window.location.href = './signIn/index.html'
    }
});




function redirectToStudent(id){
    window.location.href = `./studentPage/main.html?id=${id}`
}

//Update student -- start
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
        headers : {
            authorization: `BEARER ${localStorage.getItem('accessToken')}`
        },
        body: formdata
    })
    .then((res)=>{
        return res.json()
    }).then((results) => {

        if(results.key === 403){
            logoutHandler()
        } else if(results.response){
            renderMessage("Successfully updated student", "#06B852")
            handleStudentUpdatedData({ formdata, id, image: results.response.image, index });
            closeAddEditStudentModal()
        }
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
            <i class="fa-solid fa-pen-to-square edit" onclick='addEditStudentModal("EDIT", ${id}, "${name}", "${image}", "${className}", ${age}, "${address}", ${rollNo}, "${contactNo}", ${index})'></i>
            <i class="fa-solid fa-trash delete"></i>
        </td>
    `
    )
} 
//Update student -- end


//Create student -- start
function addEditStudentModal(status, id, name, image, className, age, address, rollNo, contactNo){
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
        document.getElementById("profileImage").src = `http://127.0.0.1:3000/${image}`

        
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
        headers : {
            authorization: `BEARER ${localStorage.getItem('accessToken')}`
        },
        body: formdata
    })
    .then((res)=>{
        return res.json();
    })
    .then((res)=>{
        if(res.key === 403){
            window.location.href = './signIn/index.html'
        } else if(res.response){
            let studentRows = document.getElementsByClassName("studentRow");
            renderMessage("Successfully added student", "#06B852")
            handleNewStudentData(formdata, res.response.id, res.response.image, studentRows.length)
            closeAddEditStudentModal()
        } else {
            renderMessage("Something went wrong, retry!!", "#B81606")
        }
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
    fetch(`${url}/getAllStudents`,{
        headers : {
            authorization: `BEARER ${localStorage.getItem('accessToken')}`
        }
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.key === 403){
            logoutHandler()
        } else if(res.response){
            let table = document.getElementById("studentTableBody")
        
            res.response.forEach((element, index) => {
                // console.log(element, table)
                table.innerHTML += renderStudentInTable({ ...element, index })
            });
        }       
    })
}


function deleteStudent(id){
    fetch(`${url}/deleteStudent/${id}`,{
        method: "DELETE",
        headers : {
            authorization: `BEARER ${localStorage.getItem('accessToken')}`
        },
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
    document.getElementById(`name`).value = "";
    document.getElementById(`className`).value = "";
    document.getElementById(`age`).value = "";
    document.getElementById(`address`).value = "";
    document.getElementById(`rollNo`).value = "";
    document.getElementById(`contactNo`).value = "";  
    document.getElementById(`image`).value = "";  
    document.getElementById("profileImage").src = "https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg"

}

function logoutHandler(){
    localStorage.clear();
    localStorage.setItem("message", "Logged out!!")
    window.location.href = './signIn/index.html';
}

function profileImageHandler(){
    let image = document.getElementById("image")
    let imageSrc = document.getElementById("profileImage")

    let reader = new FileReader();
    reader.readAsDataURL(image.files[0]);

    reader.onload = function (event) {
        imageSrc.src = event.target.result;
    };
}