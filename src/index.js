const express = require('express');
const axios = require('axios');
const app = express();
const responseTime = require('response-time');
const redis = require('redis');

const client = redis.createClient({
    host: "127.0.0.1",
    port: 6379
})

//Middleware de expres
app.use(responseTime());

app.get('/character', async (req, res) => {

    //Verificar si la data está en redis, si no está hace la peticion de los datos
    client.get("characters", async (err, reply) => {
        if (reply)
            //Convertir de string a Objeto
            return res.json(JSON.parse(reply))

        //Peticion a una api
        const response = await axios.get('https://rickandmortyapi.com/api/character');

        //Redis guarda en string, por lo que debemos pasar el objeto a string
        const data = JSON.stringify(response.data);

        //Guardamos en redis
        client.set('characters', data, (err, reply) => {

            if (err) console.log(err)

            console.log(reply)
            res.json(response.data)
        });
    });


});
app.listen(3000, () => {
    console.log("Corriendo sin problemas");
});