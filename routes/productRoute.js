const express = require("express")
const productRouter = express.Router()
const Product= require("../models/productModel")

productRouter.post("/product",async(req,res)=>{
    //console.log(req.body)
//    Product.create(req.body)
//    res.status(200).send({succes: true, message: "Product Added"})
try {
    let product = await Product.create(req.body)
    res.status(200).send({status:true, message:"Product Created", product:product})
} catch (error) {
    console.log(error)
    res.status(400).send({status:false,message: error.message})
}
})

productRouter.get("/product", async(req, res)=>{
    try {
       let products=  await Product.find({})
       res.status(200).send({status: true, message:"Get All products", products:products})
    } catch (error) {
        res.status(400).send({status: false, message: error.message})
    }
})
productRouter.get("/product/:id", async(req, res)=>{
    try {
        const id= req.params.id
        let product = await Product.findById(id)
        res.status(200).send({status:true, message:"Product", product:product})
    } catch (error) {
        res.status(400).send({status: false, message: error.message})
    }
})
productRouter.delete("/product", async(req, res)=>{
    try {
        //const id = req.body.id //obje içindeki türü alma yöntemi
        // const name = req.body.name
        //let {id, name}= req.body
        let {id} = req.body //obje geri dönüşü alma yöntemi
        let product = await Product.findByIdAndDelete(id)
        if(!product){
        return res.status(404).send({status: false, message:"Product not found!"})
        }
        res.status(200).send({status:true, message:"Product Deleted"})
    } catch (error) {
        res.status(400).send({status: false, message: error.message})
    }
})
productRouter.put("/product", async(req,res)=>{
    try {
        let {id}= req.body
        if(!id){
            return res.status(404).send({status: false, message:"Id is required"})
        }
        let product = await Product.findByIdAndUpdate(id, req.body)
        res.status(200).send({status: true, message:"Product Update", product: product})
    } catch (error) {
        res.status(400).send({status:false, message: error.message})
    }
})



module.exports = productRouter