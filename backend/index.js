const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectToDB = require('./db/db')
const userRouter = require('./routes/user')
const driverRouter = require('./routes/driver')

const PORT = process.env.PORT
connectToDB()
app.use(cors())

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        message:'hello'
    })
})

app.use('/users', userRouter)
app.use('/drivers', driverRouter)

app.listen(PORT, ()=>{
    console.log(`listening on PORT ${PORT}`);
    
})