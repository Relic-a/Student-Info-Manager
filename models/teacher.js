const mongoose = require('mongoose')
const {Schema} = mongoose

const teacherSchema = new Schema({
    name: {type: String, required: true, index: true},
    email: {type: String},
    phoneNumber: String,
    subjects: [{type: String}]
})

const TeacherModel = mongoose.model('Teacher', teacherSchema)
TeacherModel.init().then(()=>{
    console.log('teacher indexed successfully')
}).catch(err=>{
    console.log(`teacher didn't index ${err}`)
})
module.exports = TeacherModel


// fetch('http://localhost:4000/teacher/add',{
//     method: "POST",
//     headers: {
//         'Content-Type': 'application/json' // Specify the content type as JSON
//     },
//     body: JSON.parse({
//         name: 'mnase',
//         email: '<script>you are hacked</script>'
//     })
// })