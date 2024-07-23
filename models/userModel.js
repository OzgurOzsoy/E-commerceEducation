const { default: mongoose } = require("mongoose");
const validator=require("validator")

const userSchema = new mongoose.Schema({
username:{
    type: String,
    required: [true, "Username is required"],
    unique : true
},
password:{
    type: String,
    required:[true, "Password is required"]
},
email:{
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate:{
    validator: validator.isEmail,
    message:  "Please enter a valid email address"
    }
}
})
const User = mongoose.model("User", userSchema)
module.exports = User