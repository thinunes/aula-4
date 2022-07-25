const express = require("express")

const app = express()



app.use(express.json())


const rotaProdutos = require('./routes/routeProdutos')



app.use('/produtos', rotaProdutos)




 app.use((req,res,next)=>{


res.send("erro 404,page not foud")

next()
 })
 
app.listen((3001),()=>{
    console.log("servidor no ar")
})