const url = "http://127.0.0.1:3000/v1"
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


function getStudent(){
    fetch(`${url}/getStudentDetailsById/${id}`)
    .then((res) => res.json())
    .then((res) => {        
        console.log(res, "STUDENT DATA")
        let table = document.getElementById("subjectTable")
        let profile = document.getElementById("details")

        profile.innerHTML += showProfile(res.response)
        res.response.subjects.forEach(element => {
            // console.log(element, table)
            table.innerHTML += tableRow({ ...element })
        });
    })
}

getStudent();


function tableRow({ id, name, marks, total }){
    return (
    `<tr class="table-row" id=${id}>		
        <td class="table-data ">${id}</td>
        <td class="table-data">${name}</td>
        <td class="table-data">${marks}</td>
        <td class="table-data">${total}</td>

        <td class="table-data">
            <i class="fa-solid fa-pen-to-square edit" onclick='editSubject(${id}, "${name}", ${marks}, "${total}")'></i>
            <i class="fa-solid fa-trash delete" onclick="deleteSubject(${id})"></i>
        </td>
    </tr>`
    )
}

function showProfile(data) {
    return (
        `<img class="student-img" src='data:image/jpeg;base64,${btoa(data.image)}'/>
        <h3 class="student-name">${data.name}</h3>
        <p class="student-class">Class - ${data.className}</p>
        <p class="student-roll">Roll no - ${data.rollNo}</p>
        <p class="student-address">Address - ${data.address}</p>
        <p class="student-contact">Contact no - ${data.contactNo}</p>
        <p class="student-age"> Age - ${data.age}</p>`
    )
}



function addTableRow(){
    return (
        `<div class="table-row" id="new_row">		
            <div class="table-data">#</div>
    
            <div class="table-data">
                <input id="name"/>
            </div>

            <div class="table-data">
                <input id="marks"/>
            </div>

            <div class="table-data">
                <input id="total"/>
            </div>

            <div class="table-data">
                <input type="submit" onclick='createSubject()'/>
            </div>
        </div>`
    )
} 

function addStudent(){
    let row = document.getElementById('subjectTable');
    row.innerHTML += addTableRow();
}

function createSubject(){
    const name = document.getElementById(`name`).value;
    const marks = document.getElementById(`marks`).value;
    const total = document.getElementById(`total`).value;

    const data = { name, marks, total };
    
    fetch(`${url}/addStudentSubject/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data })
    })
    .then((res)=>{
        return res.json();
    })
    .then((res)=>{
        let row = document.getElementById('new_row');
        row.remove();
        let table = document.getElementById("subjectTable")
        table.innerHTML += tableRow({ ...data, id: res.response.id})
    })
}


function deleteSubject(subjectId){
    fetch(`${url}/deleteSubject/${id}/${subjectId}`,{
        method: "DELETE"
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res, 'data')
        let row = document.getElementById(subjectId);
        row.remove();
    })
}


function editSubject(id, name, marks, total){
    let row = document.getElementById(id);
    row.innerHTML = editTableRow(id, name, marks, total);
}


function editTableRow(id, name, marks, total ){
    return (
    `		
        <div class="table-data id">${id}</div>
   
        <div class="table-data ">
            <input id="name_${id}" value='${name}'/>
        </div>

        <div class="table-data">
            <input id="marks_${id}" value='${marks}'/>
        </div>

        <div class="table-data">
            <input id="total_${id}"  value='${total}'/>
        </div>

        <div class="table-data">
            <input type="submit" onclick='updateSubject(${id})'/>
        </div>
    `
    )
}

function updateSubject(subjectId){
    const name = document.getElementById(`name_${subjectId}`).value;
    const marks = document.getElementById(`marks_${subjectId}`).value;
    const total = document.getElementById(`total_${subjectId}`).value;

    const data = { name, marks, total };

    fetch(`${url}/updateSubjectById/${id}/${subjectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data })
    })
    .then((res)=>{
        renderUpdatedSubject({ ...data, id: subjectId });
        console.log(res);
    })
    
}


function renderUpdatedSubject({ id, name, marks, total }){
    let row = document.getElementById(id);
    row.innerHTML = updatedTableData(id, name, marks, total);
}

function updatedTableData( id, name, marks, total ){
    return (
    `	
        <td class="table-data ">${id}</td>
        <td class="table-data">${name}</td>
        <td class="table-data">${marks}</td>
        <td class="table-data">${total}</td>

        <td class="table-data">
            <i class="fa-solid fa-pen-to-square edit" onclick='editSubject(${id}, "${name}", ${marks}, "${total}")'></i>
            <i class="fa-solid fa-trash delete" onclick="deleteSubject(${id})"></i>
        </td>
    `
    )
} 