const asyncHandler = require('express-async-handler')
const goal = require("../model/goal.Modal")
const User = require("../model/user.Modal")
const { use } = require('../routes/goalRoutes')
const getgoals =asyncHandler(async(req,res )=>{
    
   const goals = await goal.find({user:req.user.id})
   res.json({goals})
})



const setGoals = asyncHandler(async (req,res) => {

const goals = await goal.create({text:req.body.text,
user:req.user.id})
res.json(goals)
})



const updateGoals = asyncHandler(async(req,res) =>{
    const goals = await goal.findById(req.params.id)
    if(!goals) {
        res.status(400);
    throw new Error('goal not found')  
    }
    const user = await User.findById(req.user.id)
if(!user){
    res.status(400);
    throw new Error('user not found')
}

// make sure the logged in user match the goal user
 if(goals.user.toString() !=  user.id) {
    res.status(400);
    throw new Error('user not authorise')

 }
 const updategoals = await goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(updategoals)
})

const deleteGoals = asyncHandler(async(req,res) => {
    const goals = await goal.findById(req.params.id)
    if(!goals) {
        res.status(400);
    throw new Error('goal not found')  
    }
    const user = await User.findById(req.user.id)
if(!user){
    res.status(400);
    throw new Error('user not found')
}

// make sure the logged in user match the goal user
 if(goals.user.toString() !=  user.id) {
    res.status(400);
    throw new Error('user not authorise')

 }
    const deleteGoals = await goal.findByIdAndDelete(req.params.id)
    res.json(deleteGoals)
})
module.exports = {
    getgoals,
    setGoals,
    updateGoals,
    deleteGoals
}