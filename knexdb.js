import knex from "knex";

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        searchPath: ['CrazyWeekEnd']
    }
})

export default db;