const express = require("express")

const app = express()

let produtos = require("./produtos")

app.use(express.json())


app.get('/', (req, res)=>{

    for(i =0 ; i < produtos.length; i++){
        produtos[i].id = i+ 1
    }

res.json(produtos)

})

app.post('/produtos', (req, res)=>{

    let corp = req.body

    produtos = [...produtos, corp]

    res.json(produtos)
})








app.listen((3001),()=>{
    console.log("servidor no ar")
})