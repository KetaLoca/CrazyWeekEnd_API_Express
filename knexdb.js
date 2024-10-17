import knex from "knex";

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: '$Logitech321',
        database: 'postgres',
        searchPath: ['CrazyWeekEnd']
    }
})

export default db;