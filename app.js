const ethers = require('ethers')
const provider = new ethers.providers.WebSocketProvider('wss://wss-testnet.5ire.network/')

const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const ejsMate = require('ejs-mate')
app.set('view engine','ejs')
app.engine('ejs',ejsMate)

app.set('views',path.join(__dirname,'/views'))

app.use(express.static(path.join(__dirname,'/public')))

const key = process.env.MY_KEY
console.log(key)
const hash = '0xlsh76924nfhsln3ksd8fhsl9shn02h320'

const ERC20_ABI =[
    'function name() view returns(string)',
    'function symbol() view returns(string)',
    'function totalSupply() view returns(uint256)',
    'function balanceOf(address) view returns(uint)'
]

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const contract = new ethers.Contract(address, ERC20_ABI,provider)

let name
let symbol
let totalSupply
let balance

const main =  async() =>{
     name = await contract.name()
     symbol = await contract.symbol()
     totalSupply = await contract.totalSupply()
     balance = await contract.balanceOf('0x837c20D568Dfcd35E74E5CC0B8030f9Cebe10A28')
}


app.get('/',(req,res)=>{
    res.send(`Heroku testing again and key is ${key}`)
})

app.get('/date',(req,res)=>{
    res.render('showdate')
})

app.get('/home',(req,res)=>{
    main()
    res.send(`\nReading from address ${address}
    \n Name: ${name}
    \nSymbol: ${symbol}
    \nTotal Supply: ${totalSupply}
    \nBalance: ${ethers.utils.formatEther(balance)}
    `)
})

app.get('/api',(req,res)=>{
    res.json({hash})
})

const port = process.env.PORT ||4000
app.listen(port,(req,res)=>{
    console.log(`Listening on port ${port}`)
})