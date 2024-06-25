const GradeModel = require('../models/grade')
const SchoolYearModel = require('../models/schoolYear')
const {dataEncrypter,dataDecrypter} = require('../controllers/dataEncrypter')

exports.gradesViewer = async (req, res) => {
  try{
  const grades = await GradeModel.find({})
  grades.forEach(grade =>{
    grade.gradeName = dataDecrypter(grade.gradeName, process.env.GRADE_ENCRYPTING_CODE)
  })
  res.send(grades)
  }
  catch(err){
    console.log(err)
  }
}
exports.gradeCreator = async (req, res) => {
  try {
    const schoolYearId = req.params.schoolyearid;
    const { gradeName } = req.body;

    const grade = new GradeModel({
      gradeName: dataEncrypter(gradeName, process.env.GRADE_ENCRYPTING_CODE),
      schoolYearId: schoolYearId,
      studentCount: 0,
      averagePerformance: 0,
      classCount: 0,
    });

    await grade.save();

    res.status(201).json({ message: 'Grade created successfully', grade });
  } catch (err) {
    console.error(err)
  }
};
exports.gradeEditor = async (req, res) => {
  const { gradeid, schoolyearid } = req.params
  const sentFields = Object.keys(req.body)
  console.log('banana')
  try {
    const gradeName = dataEncrypter(req.body.gradeName, process.env.GRADE_ENCRYPTING_CODE)
    const grade = await GradeModel.findById(gradeid)
    console.log(grade)
    if (!(grade.schoolYearId.toString() == schoolyearid)) {
      return res.status(404).json({ message: 'wrong ids' })
    }
    if (sentFields.includes('gradeName')) {
      grade['gradeName'] = gradeName
    }
    grade.save()
  } catch (err) {
    console.error(`error found when editing grade ${err}`)
    res.status(500).json({ message: 'Error updating grade', error: err.message });
  }
}
exports.gradeDeletor = async (req, res) => {
  try {
    const gradeid = req.params.gradeid;
    const grade = await GradeModel.findById(gradeid);
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    const deletedObject = await GradeModel.deleteOne({ _id: gradeid });
  } catch (err) {
    console.error(`Error when trying to delete grade: ${err}`);
  }
};