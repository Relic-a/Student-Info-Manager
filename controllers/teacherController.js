const TeacherModel = require('../models/teacher')
const {dataEncrypter} = require('../controllers/dataEncrypter')

exports.addTeacher = async (req,res)=>{
    try{
        const submittedKeys = Object.keys(req.body)
        let teacher = {}
        for(x of submittedKeys){
          teacher[x] = dataEncrypter(req.body[x], process.env.TEACHER_ENCRYPTING_CODE)
        }
        const newTeacher = new TeacherModel(
            teacher
        )
        newTeacher.save()
    }catch(err){

    }
}
exports.editTeacher = async (req,res)=>{
    try{
        const submitedKeys = Object.keys(req.body)
        let teacher = {};
        for(x of submitedKeys){
            teacher[x] = dataEncrypter(req.body[x],process.env.TEACHER_ENCRYPTING_CODE)
        }
        const updatedTeacher = await TeacherModel.updateOne(
            {'_id': req.params.teacherId},
            teacher
        )
    }catch(err){
        console.error(err)
    }
}

// fetch('http://localhost:4000/api/teacher/edit/662cce8ad8e0a3b31ea4a7db', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.parse({
//         name: 'baka the bald',
//         email: 'baki@gmail.com',
//         phoneNumber: '+2514929349394',
//         subjects: ["English","Physics"]
//     })
// })