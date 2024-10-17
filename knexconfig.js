
export default {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: '$Logitech321',
            database: 'postgres',
            searchPath: ['CrazyWeekEnd']
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: { min: 2, max: 10 }
    }
};