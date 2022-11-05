/* Importing the config function from the dotenv module and then calling it. */
import {config} from 'dotenv';
config()

/* Exporting the host and port from the .env file. */
export const HOST = process.env.HOST;
export const PORT = process.env.PORT
