import knex from "knex";
import knexconfig from "./knexconfig.js";

const environment = procces.env.NODE_ENV || 'development';
const db = knex(knexconfig(environment));

export default db;