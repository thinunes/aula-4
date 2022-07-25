const express = require('express')

const routes = express.Router()

let produtos = require("../produtos")

routes.use(express.json())

routes.get('/', (req, res)=>{

    for(i =0 ; i < produtos.length; i++){
        produtos[i].id = i+ 1
    }

    res.json(produtos)
    
})

//precisa passar pelo app.use(express.json())



function validadePrice (req, res, next){
    const {price} =  req.body

    if (price){
        next()
    }

    return res.status(400).send('Produto sem preço')
}




//posta um produto que eu passar pelo body
routes.post('/', validadePrice, (req, res)=>{

    let corp = req.body

    produtos = [...produtos, corp]

   return res.json(produtos)
})


//pega a um unico produto passando por um parametro
routes.get('/:id/:details?', (req, res)=>{

    const id = Number(req.params.id)

    const details = req.params.details || "sem descrição"

    const product = produtos.find((produto)=> produto.id === id)

    res.status(200).json(product)
})

// atualiza um produto mas precisa vir com todas as caracteristicas de obj ja definidos
routes.put('/:id', (req, res)=>{
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
routes.delete('/:id', (req, res)=>{
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

module.exports = routes
