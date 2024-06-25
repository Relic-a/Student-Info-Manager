const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the Class subjects
const subjectSchema = new Schema({
    subjectName: {type: String, required: true, unique: true},
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' } // Reference to Teacher._id
});

// Define the schema for the terms in a semester
const termSchema = new Schema({
    termName: {type: String, required: true, unique: true},
    studentScores: [{
        studentId: { type: Schema.Types.ObjectId, ref: 'Student' }, // Reference to Student._id
        scores: [{
            subjectId: { type: Schema.Types.ObjectId}, // Reference to Class.subjects._id
            score: Number
        }]
    }]
});

// Define the schema for the semesters in the Class
const semesterSchema = new Schema({
    semesterName: {type: String, required: true, unique: true},
    terms: [termSchema] // Array of terms
});

// Define the main schema for the Class
const classSchema = new Schema({
    className: {type: String, required: true, unique: true},
    gradeId: { type: Schema.Types.ObjectId, ref: 'Grade', required: true }, // Reference to Grade._id
    subjects: [subjectSchema], // Array of subjects
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }], // Array of studentIds
    semesters: [semesterSchema] // Array of semesters
});

const ClassModel = mongoose.model('Class', classSchema);

module.exports = ClassModel;
