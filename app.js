const express = require("express")

const app = express()



app.use(express.json())


const rotaProdutos = require('./routes/routeProdutos')



app.use('/produtos', rotaProdutos)





app.listen((3001),()=>{
    console.log("servidor no ar")
})