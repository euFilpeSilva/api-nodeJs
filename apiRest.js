const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

let meusProdutos = fs.readFileSync('produtos.json')
let produtos = JSON.parse(meusProdutos)
 

app.get('/', (req,res,next) => {
    res.send("teste")
    next(error => console.error(error))
})

// rota pra listar os produtos
app.get('/produtos', (req, res, next) => {
    res.json(produtos)
})


// rota pra consultar um unico livro
app.get('/produtos/:id', (req, res) => {
    const id = Number(req.params.id)
     for(let item of produtos){
        if(item.id === id){  
           res.json(item);
            return;
        }
    }
    res.status(404).send('Produto não encontrado!')
});

// rota pra cadastrar produtos
app.post('/novosProdutos', (req, res, next) => {
    const novoProduto = req.body;

    if(Array.isArray(novoProduto)){
        for(item of produtos){
            produtos.push(item)
        }
    }else{
            produtos.push(novoProduto)
        }
        let jsonList = JSON.stringify(produtos)
        fs.writeFile('produtos.json', jsonList, 'utf8', () => {})
        res.send('Produto cadastrado com sucesso')
    }
);


app.listen(3000, () => {
    console.log("rodando");
})