const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
app.set('view engine','ejs')

app.set('views',path.join(__dirname,'/views'))

app.use(express.static(path.join(__dirname,'/public')))

const key = process.env.MY_KEY
console.log(key)
const hash = '0xlsh76924nfhsln3ksd8fhsl9shn02h320'

app.get('/',(req,res)=>{
    res.send(`Heroku testing and key is ${key}`)
})

app.get('/date',(req,res)=>{
    res.render('showdate.ejs')
})

app.get('/api',(req,res)=>{
    res.json({hash})
})

const port = process.env.PORT ||4000
app.listen(port,(req,res)=>{
    console.log(`Listening on port ${port}`)
})