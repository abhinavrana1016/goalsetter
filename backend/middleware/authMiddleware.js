const asyncHandler = require('express-async-handler')
const User = require("../model/user.Modal")
const jwt = require('jsonwebtoken')

const protect = asyncHandler(async(req,res,next)=>{
let token

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
        token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,"abc123")
        req.user = await User.findById(decode.id).select('-passowrd')
        next()
    }
    catch(error)
    {
console.log(error)
res.status(400)
throw new Error('not auth')
    }
}
if(!token) {

    res.status(400)
    throw new Error('Not authorise')
}

})
module.exports = {protect}