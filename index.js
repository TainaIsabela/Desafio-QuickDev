const express = require('express');
const mongoose = require('mongoose')
const app = express();

const Person = require('./models/Person');
 
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

mongoose.connect(' mongodb+srv://admin:quickdev@quickdev.tu0s5.mongodb.net/Quickdev-Desafio?retryWrites=true&w=majority')
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(3000, () => {
            console.log('Servidor está rodando na porta 3000');
        });

    })
    .catch((err) => {
        console.log(err);
    })