const express = require('express');
const router = express.Router();

const studentController = require('../controllers');

//health
router.get('/health', async (req, res) => {
    return res.json({msg: "Server is up"})
});


//create student
router.post('/createStudent', studentController.createStudentDetails);

//get student details
router.get('/getAllStudents', studentController.getStudentDetails);

//get student details by id
router.get('/getStudentDetailsById/:id', studentController.getStudentDetailsById);

//update student details
router.put('/updateStudentById/:id', studentController.updateStudentById);

//add subject by student id
router.put('/addStudentSubject/:id', studentController.addStudentSubjectById);

module.exports = router;