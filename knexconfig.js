const { Pool } = require("pg");

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: '$Logitech321',
            database: 'postgres'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: { min: 2, max: 10 }
    }
};