const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT

app.use(cors())

app.get('/',(req,res)=>{
    res.json({
        message:'hello'
    })
})

app.listen(PORT, ()=>{
    console.log(`listening on PORT ${PORT}`);
    
})