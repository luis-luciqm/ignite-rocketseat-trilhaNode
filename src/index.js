const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid') // v4 gera números randomicos para o id

app.use(express.json()); // middleware para formatos json

customers = [];

// middlewares;
// caso queria utilizar uma middleware em todas as rotas, basta usar: app.use(nomeDaFuncaoMiddlware)
function verificaSeContaExisteCPF(request, response, next){ // isso é um middleware
    const { cpf } = request.headers;
    const customer = customers.find((customer) => customer.cpf === cpf);

    if(!customer)
        return response.status(400).json({ error: "Esta conta já existe" });

    request.customer = customer;
    
    return next(); // se não der erro, irá prosseguir
}

app.post("/account", (request, response) => {
    const {cpf, name} = request.body; // desestruturação
    const existeUmCpf = customers.some( // verifica se existe aquele cpf já cadastrado
        (customer) => customer.cpf === cpf
    );

    if (existeUmCpf){
        return response.status(400).json({error: "Esse cpf já existe"});
    }

    customers.push({ // salvando no array (database fake)
        id: uuidv4(),
        name,
        cpf,
        statement: [],
    });

    return response.status(201).send();

});

app.get("/statement", verificaSeContaExisteCPF, (request, response) => { // pegando cpf via route params; parametro do meio é o middlware
    // const { cpf } = request.params; |=> seriam utilizado caso o cpf estivesse vindo por parametro na URL
    const { customer } = request;

    return response.status(200).json(customer.statement);
});

app.listen(5000, () => {
    console.log('server is running in port 5000');
});