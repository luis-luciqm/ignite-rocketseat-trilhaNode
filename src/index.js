const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid') // v4 gera números randomicos para o id

app.use(express.json()); // middleware para formatos json

customers = [];

app.post("/account", (req, res) => {
    const {cpf, name} = req.body; // desestruturação

    const existeUmCpf = customers.some( // verifica se existe aquele cpf já cadastrado
        (customer) => customer.cpf === cpf
    );

    if (existeUmCpf){
        return res.status(400).json({error: "Esse cpf já existe"});
    }

    customers.push({ // salvando no array (database fake)
        id: uuidv4(),
        name,
        cpf,
        statement: [],
    });

    return res.status(201).send();

});

app.get("/statement/:cpf", (req, res) => { // pegando cpf via route params  
    const { cpf } = req.params;

    const customer = customers.find((customer) => customer.cpf === cpf);

    return res.json(customer.statement)

});

app.listen(5000, () => {
    console.log('server is running in port 5000');
});