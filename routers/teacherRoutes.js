const express = require('express')
const router  = express.Router()
const {sanitizeFields, modernSanitizeFields} = require('../validator/expValid')

const TeacherController = require('../controllers/teacherController')

router.post('/teacher/add', modernSanitizeFields,TeacherController.addTeacher)
router.post('/teacher/edit/:teacherId', modernSanitizeFields,TeacherController.editTeacher)

module.exports = router