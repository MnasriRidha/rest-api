const express = require("express")
const User = require("../models/User")

const router = express.Router()

//FIND ALL USERS 
router.get("/", async (req, res)=>{
    try {
        const  allUsers = await User.find({})
        res.send(allUsers)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
      }
})

//ADD A NEW USER
router.post("/", async (req, res)=>{
    try {
        const findUser = await User.findOne({name:req.body.name})
        if(findUser){ return res.status(400).send({msg: "user already existed"})} 
        const newUser = new User({...req.body})
        await newUser.save()
        res.send({newUser,msg:"new user successfully added "})
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message)   
    }
})

//EDIT  USER BY ID 
router.put("/:id", async (req, res)=>{
    try {
        const editUser= await User.updateOne({_id: req.params.id}, {$set:{...req.body}})
        const newUser = await User.find({_id: req.params.id})
        if(editUser.modifiedCount){ return res.send({msg: "user updated", newUser})}
        res.status(400).send("user not found")
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)   
    }
})

//REMOVE A USER BY ID 
router.delete("/:id", async(req, res)=>{
    try {
        const removeUser = await User.deleteOne({ _id: req.params.id})
        if(removeUser.deletedCount){ return res.send({msg:"User deleted"})}
        res.status(400).send({msg:" User not found"})
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)   
        
    }
})

module.exports= router