const express = require('express')
const router = express.Router()
const {sanitizeFields, modernSanitizeFields} = require('../validator/expValid')

const parentController = require('../controllers/parentController')

router.post('/parents/add',modernSanitizeFields, parentController.addParent)
router.post('/parents/edit/:parentId',modernSanitizeFields, parentController.editParent)

module.exports = router