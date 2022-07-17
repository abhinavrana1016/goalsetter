const express = require('express');
const dotennv = require('dotenv').config
const {errorhandler} =  require('./middleware/errorMiddleware')

const connectDb = require('./config/db')
connectDb()
const port = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorhandler)
app.listen(port,()=>console.log(`server is running at ${port}`))