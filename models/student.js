const mongoose = require('mongoose')
const {Schema} = mongoose

const studentSchema = new Schema({
    photoPath: String,
    name: {type: String, required: true, index: true},
    age: Number,
    parents: [{type: Schema.Types.ObjectId, ref: 'Parent'}],
    emergencyPhones: [{type: String}],
    behavioralActions: [{
        behaviorName: String,
        description: String}]
})

const StudentModel = mongoose.model('Student', studentSchema)
StudentModel.init()

module.exports  = StudentModel