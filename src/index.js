const express = require('express');
const axios = require('axios');
const app = express();
const responseTime = require('response-time');
const redis = require('redis');
const { promisify } = require('util');; //Libreria por defecto en node para trabajar con promesas

const client = redis.createClient({
    host: "127.0.0.1",
    port: 6379
})

//Optimizamos el callcback a una promesa para utilizar el async y el await
const GET_ASYN = promisify(client.get).bind(client)
const SET_ASYN = promisify(client.set).bind(client)

//Middleware de expres
app.use(responseTime());

app.get('/character', async (req, res) => {

    //Verificar si la data está en redis, si no está hace la peticion de los datos (Responde desde la memoria cache)
    const reply = await GET_ASYN('characters');
    if (reply)
        //Convertir de string a Objeto
        return res.json(JSON.parse(reply))

        //Peticion a una api
        const response = await axios.get('https://rickandmortyapi.com/api/character');

        //Redis guarda en string, por lo que debemos pasar el objeto a string
        const reply2 = await SET_ASYN('characters', JSON.stringify(response.data));
        res.json(reply2.data)

});


app.listen(3000, () => {
    console.log("Corriendo sin problemas");
});