const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('Heroku Test')
})

const port = process.env.PORT ||4000
app.listen(port,(req,res)=>{
    console.log(`Listening on port ${port}`)
})