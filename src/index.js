const express = require('express');
const axios = require('axios');
const app = express();
const responseTime = require('response-time');

//Middleware de expres
app.use(responseTime());
app.get('/character', async (req, res) => {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    res.send(response.data)
})
app.listen(3000, () =>{
    console.log("Corriendo sin problemas");
});