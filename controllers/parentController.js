const ParentModel = require('../models/parent')
const {dataEncrypter} = require('../controllers/dataEncrypter')
const redundent = require('./redundencyChecker')

exports.addParent = async (req,res)=>{
    try{
        const submitedKeys = Object.keys(req.body)
        if(redundent()){
            
        }
        let parent = {}
        for(x of submitedKeys){
            parent[x] = dataEncrypter(req.body[x],process.env.PARENT_ENCRYPTING_CODE)
        }
        const addedParent = new ParentModel(
            parent
        )
        addedParent.save()
    }catch(err){
        console.error(err)
    }
}
exports.editParent = async (req,res)=>{
    try{
        const submitedKeys = Object.keys(req.body)
        let parent = {};
        for(x of submitedKeys){
            parent[x] = dataEncrypter(req.body[x], process.env.PARENT_ENCRYPTING_CODE)
        }
        const updatedParent = await ParentModel.updateOne(
            {'_id': req.params.parentId},
            parent
        )
    }catch(err){
        console.error(err)
    }
}
// fetch('http://localhost:4000/api/parents/edit/662cbce65017d701563cac26', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.parse({
//         name: 'Barokas',
//         email: 'baki@gmail.com',
//         phoneNumber: '+2514929349394'
//     })
// })