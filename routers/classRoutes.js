const express = require('express')
const router = express.Router()
const {sanitizeFields, modernSanitizeFields} = require('../validator/expValid')
const classControllers = require('../controllers/classController')

router.post('/class/:gradeId/classes',modernSanitizeFields,classControllers.showClasses)

router.post('/class/:gradeId/classes/create',modernSanitizeFields,classControllers.createClass)
router.post('/class/:classId/subjects', modernSanitizeFields,classControllers.addSubjects)
router.post('/class/:classId/semesters', modernSanitizeFields,classControllers.addSemester)
router.post('/class/:classId/:semesterId/term', modernSanitizeFields,classControllers.addTerm)
router.post('/class/:classId/:subjectId/:teacherId/teacher',modernSanitizeFields,classControllers.addTeacherToSubject)

module.exports = router

// fetch('http://localhost:4000/api/662028d2195ab21f8db7852c/662031b2fd25489b6da916eb/236332622a2422v23523g/teacher',{
//     method: '',
//     headers: {
//       'Content-Type': 'application/json', 
//     }
// })
  
// fetch('http://localhost:4000/api/class/662e1d74e1dc7a5eda331c36/subjects', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.parse(
//         {
//             subjectName: "Biologous"
//         }
//     )
// })