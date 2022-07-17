const mongoose = require('mongoose');
 const userSchema = mongoose.Schema({
    firstName:{type:String,
    require:[true,"please add first name"]
},
lastName:{type:String,
    require:[true,"please add last name"]
},
email:{type:String,
    require:[true,"please add email name"]
},
mobileno:{ type:String,
    require:[true,"please add mobile name"]
},
password:{type:String,
    require:[true,"please add password"]

}
 },{timestamps:true})
 module.exports =mongoose.model("user",userSchema)