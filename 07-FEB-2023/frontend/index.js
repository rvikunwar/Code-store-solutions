const url = "http://127.0.0.1:3000/v1/getAllStudents"

function tableRow({ id, name, className, age, address, rollNo, contactNo }){
    const data = { id, name, className, age, address, rollNo, contactNo }
    return (
    `<div class="table-row" id=${id}>		
        <div class="table-data">${id}</div>
        <div class="table-data active-link">${name}</div>
        <div class="table-data">${className}</div>
        <div class="table-data">${age}</div>
        <div class="table-data">${address}</div>
        <div class="table-data">${rollNo}</div>
        <div class="table-data">${contactNo}</div>
        <div class="table-data">
            <i class="fa-solid fa-pen-to-square edit" onclick='editStudent(${id}, "${name}", "${className}", ${age}, "${address}", ${rollNo}, "${contactNo}")'></i>
            <i class="fa-solid fa-trash delete"></i>
        </div>
    </div>`
    )
} 


function editTableRow(id, name, className, age, address, rollNo, contactNo ){
    return (
    `		
        <div class="table-data">${id}</div>
   
        <div class="table-data">
            <input name="name" value='${name}'/>
        </div>

        <div class="table-data">
            <input name="name" value='${className}'/>
        </div>

        <div class="table-data">
            <input name="name" value='${age}'/>
        </div>

        <div class="table-data">
            <input name="name" value='${address}'/>
        </div>

        <div class="table-data">
            <input name="name" value='${rollNo}'/>
        </div>

        <div class="table-data">
            <input name="contactNo" value='${contactNo}'/>
        </div>
        <div class="table-data">
            <input type="submit"/>
        </div>
    `
    )
} 


function editStudent(id, name, className, age, address, rollNo, contactNo){
    let row = document.getElementById(id);
    row.innerHTML = editTableRow(id, name, className, age, address, rollNo, contactNo);
}


function updateStudent(){
    
    fetch(`${url}/updateStudentById/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data })
    })
    .then((res)=>{
        console.log(res)
    })
}

function getAllStudents(){
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
        let table = document.getElementById("studentTable")
        
        res.response.forEach(element => {
            // console.log(element, table)
            table.innerHTML += tableRow({ ...element })
        });
        // console.log(res, "STUDENT DATA")
    })
}


getAllStudents()