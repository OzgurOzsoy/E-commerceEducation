const express = require("express")
const mongoose = require("mongoose")

const Product = require("./models/productModel")
const productRouter = require("./routes/productRoute")
const userRouter = require("./routes/userRoute")
const tokenControl = require("./middleware/auth")

require("dotenv").config()

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://ozgurozsoy74:ozgurozsoy74@cluster0.5pstogy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err))

app.get("/",(req,res)=>{
res.send("Merhaba Express JS")
})
// app.get("/home", (req,res)=>{
//     res.send("Burası home otomatik")
// })

//Router Yapısı
app.use("/product",productRouter)
app.use("/user", userRouter)

//Middleware
app.use(tokenControl)
app.listen(9000)