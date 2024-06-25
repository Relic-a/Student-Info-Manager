const express = require('express')
const router = express.Router()
const {sanitizeFields, modernSanitizeFields} = require('../validator/expValid')

const studentController = require('../controllers/studentController')

router.post('/student/add', modernSanitizeFields,studentController.addStudent)
router.post('/student/edit/:studentId', modernSanitizeFields,studentController.editStudent)
router.post('/student/:studentId/addparent/', modernSanitizeFields,studentController.addParent)
router.post('/student/:studentId/addemphone/',modernSanitizeFields,studentController.addEmergencyNum)

module.exports = router

// fetch('http://localhost:4000/api/student/662e5d1dc9c4dfbaf1face59/addemphone', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.parse(
//         {
//             emergencyPhone: '+254333234233'
//         }
//     )
// })