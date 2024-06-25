const express = require('express')
const router = express.Router();
const gradeControllers = require('../controllers/gradeController')
const {sanitizeFields, modernSanitizeFields} = require('../validator/expValid')

router.get('/:schoolyearid/grades', gradeControllers.gradesViewer)
router.post('/:schoolyearid/grades/create',modernSanitizeFields, gradeControllers.gradeCreator)
router.post('/:schoolyearid/grades/edit/:gradeid', modernSanitizeFields, gradeControllers.gradeEditor)
router.get('/:schoolyearid/grades/delete/:gradeid', modernSanitizeFields ,gradeControllers.gradeDeletor)

module.exports = router

// fetch('http://localhost:4000/api/662028356da5b0264f347cee/grades/create', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.parse(
//         {
//             gradeName: 'grade 10'
//         }
//     )
// })