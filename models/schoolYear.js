const mongoose = require('mongoose');
const { Schema } = mongoose;

const schoolYearSchema = new Schema({
    schoolYearName: {type: String, required: true, unique: true},
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  numStudents: { type: Number, required: true },
  numTeachers: { type: Number, required: true },
  numClasses: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
});

const SchoolYearModel = mongoose.model('SchoolYear', schoolYearSchema);
SchoolYearModel.init().then(() => {
    SchoolYearModel.createIndexes({ isActive: 1 });
  }).catch(err => {
    console.error(err);
  });

module.exports = SchoolYearModel;