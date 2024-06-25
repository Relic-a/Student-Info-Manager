const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URL)

const schoolYearRouter = require('./routers/schoolYearRoutes')
const gradeRouter = require('./routers/gradeRoutes')
const classRouter = require('./routers/classRoutes')
const studentRouter = require('./routers/studentRoutes')
const parentRouter = require('./routers/parentRoutes')
const teacherRouter = require('./routers/teacherRoutes')
const {body} = require('express-validator')
const {dataEncrypter,dataDecrypter} = require('./controllers/dataEncrypter')
const {modernSanitizeFields} = require('./validator/expValid')
const bcrypt = require('bcrypt')
const cors = require('cors')

const CryptoJs = require('crypto-js')
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  });
app.use(cors())
app.use('/api', schoolYearRouter,gradeRouter,classRouter, studentRouter, parentRouter, teacherRouter)
app.get('/',(req,res)=>{
    console.log('nice')
})
app.use('/signup',modernSanitizeFields)
app.post('/signup',async (req,res)=>{
    const {UserName, Password} = req.body
    const adminSchema = new mongoose.Schema({
        UserName: {type: String, required: true},
        Password: {type:String,required: true}
    })
    const AdminModel = mongoose.model('admin',adminSchema)
    if(UserName && Password){
        await AdminModel.deleteMany({})
        const hashedPass = bcrypt.hash(Password, 12)
        const newAdmin = new AdminModel({
            UserName: dataEncrypter(UserName,process.env.ADMIN_ENCRYPTER),
            Password: hashedPass
        })

    }else{
        return res.json('please include username and password')
    }
})
app.post('/changepass',(req,res)=>{
    
})
app.get('/banker', (req,res)=>{
    res.json({"Mango": 'is an apple'})
})

app.listen(4000)