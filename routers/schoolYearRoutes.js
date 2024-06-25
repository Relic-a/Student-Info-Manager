const express = require('express')
const router = express.Router();
const {sanitizeFields, modernSanitizeFields} = require('../validator/expValid')


const schoolYearController = require('../controllers/schoolYearController')
router.get('/schoolyear',schoolYearController.schoolYearShower)
router.post('/schoolyear/create',modernSanitizeFields, schoolYearController.schoolYearCreator)
router.post('/schoolyear/edit/:yearid',modernSanitizeFields, schoolYearController.schoolYearEditor)
router.get('/schoolyear/delete/:id',modernSanitizeFields,schoolYearController.schoolYearDeletor)
router.get('/schoolyear/edit/:id',modernSanitizeFields,schoolYearController.schoolYearIndividualShower)
module.exports = router

// fetch('http://localhost:4000/api/schoolyear/edit/661fb3ded9a2d431c76f07c9', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.parse(
//         {
//             schoolYearName: '2023-2024',
//             startDate: '2013',
//             endDate: '2015',
//             numStudents: 200,
//             numTeachers: 32,
//             numClasses: 14,
//             isActive: false
//         }
//     )
// })