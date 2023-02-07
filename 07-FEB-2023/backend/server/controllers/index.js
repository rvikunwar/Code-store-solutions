const { cd_db } = require("../db");
const { buildResponse, buildObjectResponse } = require("../utils/common")


module.exports.createStudentDetails = async function(req, res){
    if(Object.keys(req.body).length <= 0){
        return buildResponse(res, "Invalid input", 500);
    }
    const studentData = req.body;
    const collectionName = "students";
    
    console.log("Created document", JSON.stringify(studentData))

    try{
        let count = await cd_db.maxId(collectionName);
        studentData.id = count + 1;

        await cd_db.createDocument(collectionName, studentData)
        return buildObjectResponse(res, { id: count+1, message: "Succesfull"})

    } catch(e){
        console.log("Error: " + e);
        return buildResponse(res, "Internal error", 500)
    } 
}


module.exports.getStudentDetails = async function(req, res){
    const collectionName = 'students'
    try{
        const response = await cd_db.getAllDocuments(collectionName)
        if(response.length === 0){
            return buildResponse(res, "No data found", 404)
        }
        return buildObjectResponse(res, response)
    } catch(e) {
        console.log('Error: ' + e)
        return buildResponse(res, "Internal error", 500)
    }
}


module.exports.getStudentDetailsById = async function(req, res){
    const studId = parseInt(req.params.id)
    const collectionName = "students"
    try{
        const response = await cd_db.getDocument(collectionName, "id", studId);
        if(response.length === 0){
            return buildResponse(res, "No data found", 404)
        }
        return buildObjectResponse(res, response[0])

    } catch(e){
        console.log('Error: ', e);
        return buildResponse(res, "Internal error", 500);
    }
}


module.exports.updateStudentById = async function(req, res){
    const collectionName = "students"
    const studId = parseInt(req.params.id)
    if(Object.keys(req.body).length === 0){
        return buildResponse(res, "Invalid input", 500)
    }
    try{
        const student = await cd_db.getDocument(collectionName, "id", studId);

        if(student.length <= 0){
            return buildResponse(res, "Student with this id is not available", 404)
        }

        let businessEntity = { $set: { ...req.body, id: studId }};
        
        await cd_db.updateDocument(collectionName, businessEntity, { id: studId });
        return buildResponse(res, "Successful", 200);

    } catch(e){
        console.log("Error: ", e)
        return buildResponse(res, 'Internal error', 500)
    }
}


module.exports.addStudentSubjectById = async function(req, res){
    const collectionName = "students"
    const studId = parseInt(req.params.id)
    if(Object.keys(req.body).length === 0){
        return buildResponse(res, "Invalid input", 500)
    }
    try{
        const student = await cd_db.getDocument(collectionName, "id", studId);

        if(student.length <= 0){
            return buildResponse(res, "Student with this id is not available", 404)
        }

        const subjectObj = {
            id: student[0].subjects !== undefined ? student[0].subjects.length +1: 1,
            name: req.body.name,
            marks: req.body.marks,
            total: req.body.total
        }

        let businessEntity = { $push: { subjects: subjectObj } };
        
        await cd_db.updateDocument(collectionName, businessEntity, { id: studId });
        return buildObjectResponse(res, { id: subjectObj.id, message: "Succesfull"})

    } catch(e){
        console.log("Error: ", e)
        return buildResponse(res, 'Internal error', 500)
    }
}

module.exports.deleteStudent = async function(req, res){
    let collection = "students";
    let id = req.params['id'];
    try{
        await cd_db.deleteDocument(collection, id)
        return buildResponse(res, "Succesfully deleted", 200);
    } catch(err){
        console.log("Error" + err);
        return buildResponse(res, "Internal error", 500);
    }
}


module.exports.deleteSubject = async function(req, res){
    let collectionName = "students";
    let studentId = parseInt(req.params['studentId']);
    let subjectId = parseInt(req.params['subjectId']);
    try{

        const student = await cd_db.getDocument(collectionName, "id", studentId);

        if(student.length <= 0){
            return buildResponse(res, "Student with this id is not available", 404)
        }

        const subjectArray = student[0].subjects.filter((item) => {
            if(item.id !== subjectId){
                return item
            }
        })

        let businessEntity = { $set: { subjects: subjectArray }};
        
        await cd_db.updateDocument(collectionName, businessEntity, { id: studentId });
        return buildResponse(res, "Successful deleted", 200);

    } catch(err){
        console.log("Error" + err);
        return buildResponse(res, "Internal error", 500);
    }
}


module.exports.updateSubjectById = async function(req, res){
    let collectionName = "students";
    let studentId = parseInt(req.params['studentId']);
    let subjectId = parseInt(req.params['subjectId']);

    if(Object.keys(req.body).length === 0){
        return buildResponse(res, "Invalid input", 500)
    }

    try{

        const student = await cd_db.getDocument(collectionName, "id", studentId);

        if(student.length <= 0){
            return buildResponse(res, "Student with this id is not available", 404)
        }

        const subjectArray = student[0].subjects.map((item) => {
            if(item.id === subjectId){
                return { ...req.body, id: subjectId }
            }
            return item
        })

        let businessEntity = { $set: { subjects: subjectArray }};
        
        await cd_db.updateDocument(collectionName, businessEntity, { id: studentId });
        return buildResponse(res, "Successful updated", 200);

    } catch(err){
        console.log("Error" + err);
        return buildResponse(res, "Internal error", 500);
    }

}