/* Importing the config.js file, which is the file that contains the host and port information. */
import { config } from "dotenv";
import { HOST, PORT } from "./config.js";
import redis from 'redis';

/* Creating a client for redis. */
export const client = redis.createClient({
    host: HOST,
    port: PORT
})