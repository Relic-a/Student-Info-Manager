const SchoolYearModel = require('../models/schoolYear')
const {dataEncrypter,dataDecrypter} = require('../controllers/dataEncrypter')
require('dotenv').config()


exports.schoolYearShower = async (req,res)=>{
    const schoolYears = await SchoolYearModel.find({})
    let newData = schoolYears;
    newData.forEach(schoolYear => {
        schoolYear.schoolYearName = dataDecrypter(schoolYear.schoolYearName, process.env.SCHOOL_YEAR_ENCRYPTING_SECRET_CODE)
    })
    res.json(newData)
}
exports.schoolYearCreator = async (req,res)=>{
    console.log(`the body is: ${req.body.numStudents}`)
    const {schoolYearName,startDate, endDate, numStudents, numTeachers, numClasses, isActive} = req.body
    const newSchoolYear = new SchoolYearModel({
        schoolYearName: dataEncrypter(schoolYearName, process.env.SCHOOL_YEAR_ENCRYPTING_SECRET_CODE),
        startDate: startDate,
        endDate: endDate,
        numStudents: parseInt(numStudents),
        numTeachers: parseInt(numTeachers),
        numClasses: parseInt(numClasses),
        isActive,
    });
    newSchoolYear.save()
    .then(savedYear =>{
        res.json({'sucessful':true})
    })
    .catch(err =>{
        console.error(err)
        res.json({'sucessful':false})
    })
}
exports.schoolYearEditor = async (req,res)=>{
    try{
        const yearid = req.params.yearid
        const allowedFields = ['schoolYearName','startDate','endDate','isActive', 'numTeachers','numStudents','numClasses']
        const sentFields = Object.keys(req.body)
        const schools = await SchoolYearModel.findById(yearid)
        if(!schools){
            return res.status(404).json({ message: 'School year not found' });
        }
        sentFields.forEach(field=>{
            if(allowedFields.includes(field)){
                if(field == 'schoolYearName'){
                    console.log(req.body[field])
                    schools[field] = dataEncrypter(req.body[field], process.env.SCHOOL_YEAR_ENCRYPTING_SECRET_CODE)
                }
                else{
                    schools[field] = req.body[field]
                }
                
            }
        })
        await schools.save()
    }
    catch(err){
        res.status(500).json({message: `error when trying to edit schlyear ${err}`})
    }
}
exports.schoolYearDeletor = async(req,res)=>{
    try{
        const year = await SchoolYearModel.deleteOne({"_id":req.params.id})
        res.json({'success':true})
    }
    catch(err){
        console.log(err)
    }
}
exports.schoolYearIndividualShower  = async(req,res)=>{
    try{
        const theYear = await SchoolYearModel.findById(req.params.id)
        theYear.schoolYearName  = dataDecrypter(theYear.schoolYearName, process.env.SCHOOL_YEAR_ENCRYPTING_SECRET_CODE)
        res.json(theYear)
    }
    catch(err){
        console.log(err)
    }
}