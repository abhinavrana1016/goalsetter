const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/todoapp")
        console.log('mongoDb connected')
    }
    catch(e)
    {
        console.log(e)
    }
}
module.exports=connectDb