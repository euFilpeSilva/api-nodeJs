const  app  = require("../app");
const mongoose = require('mongoose');

const url = 'mongodb+srv://filipeSilva:458956@cluster0.sfu6nuh.mongodb.net/meuBanco?retryWrites=true&w=majority'



mongoose.connect(url)
.then(
app.listen(3000, ()=>{
    console.log("Api esta ON na porta 3000!");
}))
.catch(error => console.log("Erro de conexão!", error));