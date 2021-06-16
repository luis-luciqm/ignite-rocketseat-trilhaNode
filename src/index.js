const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.json({message: 'Welcome to Ignite!'});
})

app.listen(5000, () => {
    console.log('server is running in port 5000');
})