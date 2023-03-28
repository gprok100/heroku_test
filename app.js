const express = require('express')
const app = express()
require('dotenv').config()

const key = process.env.MY_KEY
console.log(key)

app.get('/',(req,res)=>{
    res.send('Heroku Test and key is : ',key)
})

const port = process.env.PORT ||4000
app.listen(port,(req,res)=>{
    console.log(`Listening on port ${port}`)
})