const asyncHandler = require('express-async-handler')
const User = require("../model/user.Modal")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const registerUser = asyncHandler(async (req,res) => {
    const {firstName,lastName,email,password,mobileno}= req.body;
    console.log(firstName,lastName,email,password,mobileno)
    if(!firstName|| !email|| !password||!mobileno){
       res.status(400)
       throw new Error("please fill the form correctly")
    }
    //console.log(email)
    const userEmailExists = await User.findOne({email:email})
    const userPhoneExists = await User.findOne({mobileno})
    //console.log(userEmailExists.tree.email)
    if(userEmailExists) {
        res.status(400)
        throw new Error("please check your email")
    }
    if(userPhoneExists) {
        res.status(400)
        throw new Error("please check your Phone no")
    }
    // hash password
    const salt = await bcrypt.genSalt(8)
    const hashedPassowrd = await bcrypt.hash(password,salt)
    //create user 
    const createuser = await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassowrd,
        mobileno
  })
  if(createuser){
    res.status(200).json({
        _id:createuser.id,
        name:createuser.firstName,
        email:createuser.email,
        token:generateToken(createuser._id)
    })
  }
  else{
    res.status(400)
    throw new Error('invalid dta')
  }
    })

    // login Api
    const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user.id,
            name:user.firstName,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid credintal")
    }
   
        })

        //user Info
    const getme = asyncHandler(async(req,res)=>{
        
      res.json("dsfdsfsd")
    })

    //generate Token
    const generateToken = (id)=>{
        return jwt.sign({id},"abc123",{
            expiresIn:'30 days'
        })
    }
    module.exports ={
        registerUser,
        loginUser,
        getme
    }