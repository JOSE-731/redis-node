import  express from'express';
import axios from'axios';
const app = express();

import  {client}  from './db/conexion.js';
import responseTime from 'response-time';
import { promisify } from 'util'; //Libreria por defecto en node para trabajar con promesas

//Optimizamos el callcback a una promesa para utilizar el async y el await
const GET_ASYN = promisify(client.get).bind(client)
const SET_ASYN = promisify(client.set).bind(client)

//Middleware de expres
app.use(responseTime());

app.get('/character', async (req, res) => {

    //Verificar si la data está en redis, si no está hace la peticion de los datos (Responde desde la memoria cache)
    const reply22 = await GET_ASYN('characters');
    if (reply22)
        //Convertir de string a Objeto
        return res.json(JSON.parse(reply22))

        //Peticion a una api
        const response = await axios.get('https://rickandmortyapi.com/api/character');

        //Redis guarda en string, por lo que debemos pasar el objeto a string
        const reply2 = await SET_ASYN('characters', JSON.stringify(response.data));
        res.json(response.data)
});


app.listen(3000, () => {
    console.log("Corriendo sin problemas");
});