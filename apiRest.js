const express = require('express')

// bodyParser serve para trabalhar com os dados vindo do seu cliente.
//  Quando o cliente manda dados via form payload, esse pacote ele formata
//   e transforma os dados para o formato de objeto javascript e joga tudo 
//   isso em um objeto dentro do objeto de requisição (req): req. body.
const bodyParser = require('body-parser')

// fs é utilizado pra acessar o caminho raiz dos meus diretorios
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
    const id = req.params.id
     for(let item of produtos){
        if(item.id == id){  
           res.json(item);
            return;
        }
    }
    res.status(404).send('Produto não encontrado!')
});

// rota pra cadastrar produtos
app.post('/novosProdutos', (req, res) => {
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

// const {nome, marca, preco} = req.body;
// const produto = {
//     id: uuid(),
//     nome,
//     marca,
//     preco
// }

// produtos.push(produto)
// return res.status(201).json(produto)

     }
);

// rota pra deletar produtos
app.delete('/produto/:id',(req,res)=> {
    const id = req.params.id

        for(let i=0; i < produtos.length; i++) {
                if(produtos[i].id == id){
                        produtos.splice(i,1)
                        res.send('Dados apagados com sucesso!')
                        return
                }
              }
            res.status(404).send('Produto não encontrado!')
});

// renderizar em uma porta localhost
app.put('/atualizar/id', (req,res)=> {
    const {id} = req.params; 
})


app.listen(3000, () => {
    console.log("rodando");
})