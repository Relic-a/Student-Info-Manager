const StudentModel = require('../models/student')
const {dataEncrypter, dataDecrypter} = require('../controllers/dataEncrypter')

exports.addStudent = async (req,res)=>{
    try{
        const submitedKeys = Object.keys(req.body)
        let student = {};
        for(x of submitedKeys){
            if(x == 'age'){
                student[x] = req.body[x]
            }
            else if(x == 'emergencyPhones'){
                student[x] = []
                const phones = req.body[x].split(',')
                if(phones.length > 1){
                    phones.forEach((phone,index) =>{
                        student[x][index] = dataEncrypter(phone, process.env.STUDENT_ENCRYPTING_CODE)
                    })
                }
                else{
                    student[x][0] =  dataEncrypter(phones[0], process.env.STUDENT_ENCRYPTING_CODE)
                }
            }
            else{
                student[x] = dataEncrypter(req.body[x], process.env.STUDENT_ENCRYPTING_CODE)
            }
        }
        const newStudent = new StudentModel(student)
        newStudent.save()
    }
    catch(err){
        console.error(err)
    }
}

exports.editStudent = async (req,res)=>{
    try{
        const submitedKeys = Object.keys(req.body)
        let student = {};
        for(x of submitedKeys){
            if(x == 'age'){
                student[x] = req.body[x]
            }
            else if(x == 'emergencyPhones'){
                student[x] = []
                const phones = req.body[x].split(',')
                if(phones.length > 1){
                    phones.forEach((phone,index) =>{
                        student[x][index] = dataEncrypter(phone, process.env.STUDENT_ENCRYPTING_CODE)
                    })
                }
                else{
                    student[x][0] =  dataEncrypter(phones[0], process.env.STUDENT_ENCRYPTING_CODE)
                }
            }
            else{
                student[x] = dataEncrypter(req.body[x], process.env.STUDENT_ENCRYPTING_CODE)
            }
        }
        const updatedStudent = await StudentModel.updateOne(
            {'_id': req.params.studentId},
            student
        )
    }catch(err){
        console.error(err)
    }
}

exports.addParent = async (req,res)=>{
    try{
        const updatedStudent = await StudentModel.updateOne(
            {'_id': req.params.studentId},
            {$push: {'parents': req.body.parentId}}
        )
    }
    catch(err){
        console.error(err)
    }
}
exports.addEmergencyNum = async (req,res)=>{
    try{
        const updatedStudent = await StudentModel.updateOne(
        {'_id': req.params.studentId},
        {$push: {'emergencyPhones': dataEncrypter(req.body.emergencyPhone, process.env.STUDENT_ENCRYPTING_CODE)}}
    )
}
    catch(err){
        console.error(err)
    }
}

// fetch('http://localhost:4000/api/662028d2195ab21f8db7852c/student/662bde7914327daa42243872/addemphone/',{
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.parse({
//         emergencyPhone: '+2555112323'
//     })
// })