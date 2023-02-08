const url = "http://127.0.0.1:3000/v1"


function redirectToStudent(id){
    window.location.href = `./studentPage/main.html?id=${id}`
}


function bufferToBase64(data){
    let binary = '';
    let bytes = new Uint8Array(data);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    console.log(binary,window.btoa(binary), 'data')
    return window.btoa(binary);
}

function tableRow({ id, name, image, className, age, address, rollNo, contactNo }){
  console.log(image)
    return (
    `<tr class="table-row" id=${id}>		
        <td class="table-data ">${id}</td>
        <td class="table-data active-link" onclick="redirectToStudent(${id})">${name}</td>
        <td class="table-data">${ image?(`<img src='data:image/jpeg;base64,${bufferToBase64(image.data)}'/>`):'N/A'}</td>

        <td class="table-data">${className}</td>
        <td class="table-data">${age}</td>
        <td class="table-data">${address}</td>
        <td class="table-data">${rollNo}</td>
        <td class="table-data">${contactNo}</td>
        <td class="table-data">
            <i class="fa-solid fa-pen-to-square edit" onclick='editStudent(${id}, "${name}", "${btoa(image)}", "${className}", ${age}, "${address}", ${rollNo}, "${contactNo}")'></i>
            <i class="fa-solid fa-trash delete" onclick="deleteStudent(${id})"></i>
        </td>
    </tr>`
    )
} 


function editTableRow(id, name, image, className, age, address, rollNo, contactNo ){
    return (
    `		
        <div class="table-data id">${id}</div>
   
        <div class="table-data ">
            <input id="name_${id}" placeholder="Name" value='${name}'/>
        </div>

        <div class="table-data">
            <input id="image_${id}" placeholder="Profile image" type="file" value='${image}' accept="image/png, image/jpeg"/>
        </div>

        <div class="table-data className">
            <input id="className_${id}" placeholder="Class" value='${className}'/>
        </div>

        <div class="table-data">
            <input id="age_${id}" placeholder="Age"  value='${age}'/>
        </div>

        <div class="table-data">
            <input id="address_${id}" placeholder="Address"  value='${address}'/>
        </div>

        <div class="table-data">
            <input id="rollNo_${id}" placeholder="Roll no" value='${rollNo}'/>
        </div>

        <div class="table-data">
            <input name="contactNo" id="contactNo_${id}" placeholder="Contact number"  value='${contactNo}'/>
        </div>
        <div class="table-data">
            <input type="submit" onclick='updateStudent(${id}, "${image}")'/>
        </div>
    `
    )
} 


function addTableRow(){
    return (
    `<div class="table-row" id="new_row">		
        <div class="table-data">#</div>
   
        <div class="table-data">
            <input id="name" placeholder="Name"/>
        </div>

        <div class="table-data">
            <input id="image" placeholder="Profile image" type="file" accept="image/png, image/jpeg"/>
        </div>

        <div class="table-data">
            <input id="className"  placeholder="Class"/>
        </div>

        <div class="table-data">
            <input id="age" placeholder="Age"/>
        </div>

        <div class="table-data">
            <input id="address" placeholder="Address" />
        </div>

        <div class="table-data">
            <input id="rollNo" placeholder="Roll no"/>
        </div>

        <div class="table-data">
            <input name="contactNo"  placeholder="Contact number"  id="contactNo"/>
        </div>
        <div class="table-data">
            <input type="submit" onclick='createStudent()'/>
        </div>
    </div>`
    )
} 


function updatedTableData( id, name, image, className, age, address, rollNo, contactNo ){
    return (
    `	
        <div class="table-data">${id}</div>
        <div class="table-data active-link">${name}</div>
        <div class="table-data"><img src='data:image/jpeg;base64,${image}'/></div>
        <div class="table-data">${className}</div>
        <div class="table-data">${age}</div>
        <div class="table-data">${address}</div>
        <div class="table-data">${rollNo}</div>
        <div class="table-data">${contactNo}</div>
        <div class="table-data">
            <i class="fa-solid fa-pen-to-square edit" onclick='editStudent(${id}, "${name}", "${className}", ${age}, "${address}", ${rollNo}, "${contactNo}")'></i>
            <i class="fa-solid fa-trash delete"></i>
        </div>
    `
    )
} 


function editStudent(id, name, image, className, age, address, rollNo, contactNo){
    let row = document.getElementById(id);
    row.innerHTML = editTableRow(id, name, image, className, age, address, rollNo, contactNo);
}


function renderUpdatedStudent({ id, name, image, className, age, address, rollNo, contactNo }){
    let row = document.getElementById(id);
    row.innerHTML = updatedTableData(id, name, image, className, age, address, rollNo, contactNo);
}


function addStudent(){
    let row = document.getElementById('studentTable');
    row.innerHTML += addTableRow();
}


async function createFileBlob(fileList, data, callback){
    const file = fileList[0]
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onloadend = () => {
        const binaryString = reader.result // Binary string.
        console.log(binaryString, 'biary string')

        data = { ...data, image: btoa(binaryString) };
    
        callback(data)
    }
}

function updateStudent(id, image_){
    const name = document.getElementById(`name_${id}`).value;
    const className = document.getElementById(`className_${id}`).value;
    const age = document.getElementById(`age_${id}`).value;
    const address = document.getElementById(`address_${id}`).value;
    const rollNo = document.getElementById(`rollNo_${id}`).value;
    const contactNo = document.getElementById(`contactNo_${id}`).value;
    const image = document.getElementById(`image_${id}`);

    const data = { name, className, age, address, rollNo, contactNo };

    function updateStudent(data){
        fetch(`${url}/updateStudentById/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        })
        .then((res)=>{
            renderUpdatedStudent({ ...data, id });
            console.log(res);
        })
    }

    if(image.files.length>0){
        createFileBlob(image.files, data, updateStudent)
    } else {
        fetch(`${url}/updateStudentById/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        })
        .then((res)=>{
            renderUpdatedStudent({ ...data, id, image: image_ });
            console.log(res);
        })
    }
}


function createStudent(){

    const name = document.getElementById(`name`).value;
    const className = document.getElementById(`className`).value;
    const age = document.getElementById(`age`).value;
    const address = document.getElementById(`address`).value;
    const rollNo = document.getElementById(`rollNo`).value;
    const contactNo = document.getElementById(`contactNo`).value;
    const image = document.getElementById(`image`);

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
        let row = document.getElementById('new_row');
        row.remove();
        let table = document.getElementById("studentTable")
        table.innerHTML += tableRow({ ...data, id: res.response.id})
    })
}


function getAllStudents(){
    fetch(`${url}/getAllStudents`)
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


function deleteStudent(id){
    fetch(`${url}/deleteStudent/${id}`,{
        method: "DELETE"
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res, 'data')
        let row = document.getElementById(id);
        row.remove();
    })
}

getAllStudents()