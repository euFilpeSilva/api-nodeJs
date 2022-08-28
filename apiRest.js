const express = require('express')
const fs = require('fs')
const app = express()

let meusProdutos = fs.readFileSync('produtos.json')
let produtos = JSON.parse(meusProdutos)

app.get('/', (req,res,next) => {
    res.send("teste")
    next(error => console.error(error))
})

app.get('/produtos', (req, res, next) => {
    res.json(produtos)
})

app.listen(3000, () => {
    console.log("rodando");
})