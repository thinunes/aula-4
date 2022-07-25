const express = require("express")

const app = express()

let produtos = require("./produtos")

app.use(express.json())


// estou colocando id nos objs e pegando os prudutos.
app.get('/', (req, res)=>{

    for(i =0 ; i < produtos.length; i++){
        produtos[i].id = i+ 1
    }

    res.json(produtos)
    
})

//precisa passar pelo app.use(express.json())

//posta um produto que eu passar pelo body
app.post('/produtos', (req, res)=>{

    let corp = req.body

    produtos = [...produtos, corp]

    res.json(produtos)
})


//pega a um unico produto passando por um parametro
app.get('/produtos/:id/:details?', (req, res)=>{

    const id = Number(req.params.id)

    const details = req.params.details || "sem descrição"

    const product = produtos.find((produto)=> produto.id === id)

    res.status(200).json(product)
})

// atualiza um produto mas precisa vir com todas as caracteristicas de obj ja definidos
app.put('/produtos/:id', (req, res)=>{
    const id = Number(req.params.id)
    const content = req.body

    const product = produtos.find((produto)=> produto.id === id)

    if(!product){
        res.status(400).json({"mensage": "produto noa encontrado"})
    }


   const produtoAtt =  produtos.map((produto)=>{
        if(produto.id === id){
            return content
        }
        return produto
    })

    
    produtos = produtoAtt
res.status(200).json(produtos)

})


//deleta o produto pelo id passar no parametro
app.delete('/produtos/:id', (req, res)=>{
    const id = Number(req.params.id)

    const product = produtos.find((produto)=> produto.id === id)

    if(!product){
        res.status(400).json({"mensage": "produto noa encontrado"})
    }

    produtos = produtos.filter((produto)=>{

        return produto.id !== id

    })

    res.status(200).json(produtos)

})







app.listen((3001),()=>{
    console.log("servidor no ar")
})