const ClassModel = require('../models/class')
const { dataEncrypter, dataDecrypter } = require('../controllers/dataEncrypter')

exports.showClasses = async (req, res) => {
  const wantedClass = await ClassModel.findOne({ className: req.body.className })
  console.log(wantedClass)
}
exports.createClass = async (req, res) => {
  try {
    const gradeId = req.params.gradeId
    const { className } = req.body
    const classes = await ClassModel.find({})
    for (singleClass of classes) {
      if (className == dataDecrypter(singleClass.className, process.env.CLASS_ENCRYPTING_CODE)) {
        return res.json('a class with that name already exists')
      }
    }
    const newClass = new ClassModel({
      className: dataEncrypter(className, process.env.CLASS_ENCRYPTING_CODE),
      gradeId: gradeId,
      subjects: [],
      students: [],
      semesters: []
    })
    newClass.save()
  }
  catch (err) {
    console.error(`couldn't create class. ${err}`)
  }
}
exports.addSubjects = async (req, res) => {
  try {
    const { subjectName } = req.body
    const classId = req.params.classId
    const wantedClass = await ClassModel.findById(classId)
    const subjects = wantedClass['subjects']
    for (singleSubject of subjects) {
      if (subjectName == dataDecrypter(singleSubject.subjectName, process.env.CLASS_ENCRYPTING_CODE)) {
        return res.json('a subject with that name already exists')
      }
    }
    const updatedClass = await ClassModel.findByIdAndUpdate(classId, { $push: { subjects: { subjectName: dataEncrypter(subjectName, process.env.CLASS_ENCRYPTING_CODE), teacherId: null } } })
    console.log(`the updated class is ${updatedClass}`)
  } catch (err) {
    console.error(`error when adding subject: ${err}`)
  }
}
exports.addSemester = async (req, res) => {
  try {
    const { semesterName } = req.body
    const classId = req.params.classId
    const wantedClass = await ClassModel.findById(classId)
    const semesters = wantedClass['semesters']
    for (semester of semesters) {
      if (semesterName == dataDecrypter(semester.semesterName, process.env.CLASS_ENCRYPTING_CODE)) {
        return res.json('a semester with that name already exists')
      }
    }
    const updatedClass = await ClassModel.updateOne(
      { '_id': classId },
      { $push: { 'semesters': { semesterName: dataEncrypter(semesterName, process.env.CLASS_ENCRYPTING_CODE), terms: [] } } }
    )
  } catch (err) {
    console.error(err)
  }
}
// i only need to send the term name
exports.addTerm = async (req, res) => {
  try {
    const { classId, semesterId } = req.params;
    const wantedClass = await ClassModel.findOne({_id: classId})
    let wantedSemester;
    wantedClass['semesters'].forEach(semester => {
      if(semester['_id'].toString() == semesterId){
        wantedSemester = semester
      }
    })
    // const semesters = wantedClass['semesters']
    console.log(wantedSemester)
    for (term of wantedSemester['terms']) {
      if (req.body.termName == dataDecrypter(term.termName, process.env.CLASS_ENCRYPTING_CODE)) {
        return res.json('a term with that name already exists')
      }
    }
    const newTerm = {
      termName: dataEncrypter(req.body.termName, process.env.CLASS_ENCRYPTING_CODE),
      studentScores: []
    };
    const updatedClass = await ClassModel.findOneAndUpdate(
      { _id: classId, 'semesters._id': semesterId },
      { $push: { 'semesters.$.terms': newTerm } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: 'Class or semester not found' });
    }

    res.status(200).json(updatedClass);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.addTeacherToSubject = async (req, res) => {
  try {
    const { classId, subjectId, teacherId } = req.params;
    const addedTeacher = await ClassModel.findOneAndUpdate(
      { _id: classId, 'subjects._id': subjectId },
      { 'subjects.$.teacherId': teacherId }
    )
  } catch (err) {
    console.error(`error when creating class: ${err}`)
  }
}