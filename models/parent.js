const mongoose = require('mongoose')
const {Schema} = mongoose

const parentSchema = new Schema({
    name: {type: String, required: true, index: true},
    email: String,
    relationship: String,
    phoneNumber: {type: String, required: true},
    secondaryEmergencyNumber: String
})

const ParentModel = mongoose.model('Parent', parentSchema)
ParentModel.init().then(() => {
    console.log('Index creation for the name field of the Student model is complete.');
}).catch(err => {
    console.error('Error initializing index for the parent:', err);
});
module.exports = ParentModel