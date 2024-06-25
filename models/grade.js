const mongoose = require('mongoose');
const {Schema} = mongoose;

const gradeSchema = Schema({
    gradeName: {type: String, required: true, unique: true},
    schoolYearId: {type: Schema.Types.ObjectId, ref: 'SchoolYear', required: true, unique: true },
    studentCount: {type:Number, required: true},
    averagePerformance: {type:Number, required: true},
    classCount: {type:Number, required: true}
})

const GradeModel = mongoose.model('Grade', gradeSchema)
module.exports = GradeModel;