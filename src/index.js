const express = require('express');
const app = express();

app.post("/account", (req, res) => {
    const cpf = req.body; // pegando cpf de um form
});

app.listen(5000, () => {
    console.log('server is running in port 5000');
});