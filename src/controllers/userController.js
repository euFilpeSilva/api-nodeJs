require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function autenticaUsuario(req, res) {
    const { nome, email, password, confirmpassword } = req.body;

    if(!nome) {
        return res.status(422).json({ msg: 'O nome é obrigatório!' })       
    }
    if(!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!' })       
    }
    if(!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória!' })       
    }

    if(password != confirmpassword) {
        return res.status(422).json({ msg: 'As senhas não conferem!' });
    }
    
// checando se o usuario existe
    const userExists = await User.findOne({ email: email })
    
    if(userExists) {
        return res.status(422).json({ msg: 'Por favor, use outro email!' });
        
    }

// criando senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

// criando usuario
    const user = new User({
        nome,
        email,
        password: passwordHash
    })

    try {
        await user.save();

        res.status(201).json({ msg: 'Usuario criado com sucesso!' })
        
    }catch(error){
        console.log(error);
        res.status(500).json({ msg: 'Ocorreu um erro no servidor!'});
    }
  
}

// Login usuario
async function userLogin(req, res) {
    const { email, password } = req.body;

// validações
     if(!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!' })       
    }
    
    if(!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória!' })       
    }

// Checar se o usuario existe
    const user = await User.findOne({ email: email});

      if(!user) {
        return res.status(404).json({ msg: 'Usuario não encontrado!' });
      }

    //   Checar se a senha bate com o cadastro
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
        return res.status(422).json({ msg: 'Senha inválida!' });
      }

    try {
        const secret = `${process.env.SECRET}`
        const token = jwt.sign(
            {
                id: user._id
            },
            secret
        )
            res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token })
    }catch(error) {
        console.log(error);
        res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" })
    }
}

// privada
async function rotaPrivada(req, res) {
const id = req.params.id

// checando se existe
    const user = await User.findById(id, '-password')

    if(!user) {
       return res.status(404).json({ msg: 'Usuario não encontrado!' });
    }
    res.status(200).json({ user });
}

// verifica o token brear
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split("")[1]

    if(!token){
        return res.status(401).json({ msg: "Acesso negado!" })
    }

    try {
        const secret = `${process.env.SECRET}`
        jwt.verify(token, secret) 
        next()
    }catch(err) {
        res.status(400).json({ msg: 'Token invalido!' })
    }
}

module.exports = {
    autenticaUsuario,
    userLogin,
    rotaPrivada,
     checkToken
}