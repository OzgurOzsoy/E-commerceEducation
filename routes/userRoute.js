const express = require("express")
const userRouter = express.Router()
const User = require("../models/userModel")
const jwt= require("jsonwebtoken")
const tokenControl = require("../middleware/auth")

userRouter.post("/register", async(req, res)=>{
try {
    const {username, email, password} = req.body
    if(!username || !email || !password){
        return res.status(404).send({status:false, message:"Invalid empty field"})
    }
    let user = await User.create(req.body)
    // let user = User.create({username, password, email})
    res.status(200).send({status:true, message:"User created",user:user})
} catch (error) {
    res.status(400).send({status: false, message: error.message})
}
})

userRouter.post("/login", async(req,res)=>{
    try {
    const {username, password}= req.body
    if(!username || !password || username == "" || password == ""){
    return res.status(404).send({status: false, message:"Empty field"})
    }  
    let userFromDb= await User.findOne({username})
    //Normalde password ve username için ayrı ayrı hata mesajı dönülmemesi gerekir. Ders anlatımı sebebiyle ayrı yazılmıştır
    if(!userFromDb){
       return res.status(404).send({status: false, message:"Username is not found"})
    }
    if(password != userFromDb.password){
        return res.status(404).send({status:false, message:"Incorrect Password"})
    }
    //Token İşlemi - .env kütüphanesi iner
    //Jsonwebtoken import et
    let access_token = jwt.sign({userId: userFromDb.id, username: userFromDb.username}, process.env.MYKEY, {
        expiresIn: "2h"
    })
    res.status(200).send({status:true, message:`Welcom ${userFromDb.username}`,
         user: userFromDb,
        access_token:access_token
        })
    } catch (error) {
    res.status(400).send({status: false, message: error.message})
    }
})

userRouter.get("/getAll",tokenControl, async(req,res)=>{
    try {
        const users = await User.find({})
        res.status(200).send({status:true, message:"Get All Users", users:users})
    } catch (error) {
        res.status(400).send({status: false, message: error.message})
        
    }
})

module.exports = userRouter