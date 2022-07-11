const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    lastName:{type:String},
    age: Number,
    phone:Number,
    email:{type:String, trim:true, required:true},
    adresse: String

})

module.exports= User = mongoose.model("user", userSchema)