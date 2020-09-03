module.exports = {
    default: 'connection1.development',
    connection1: {
        development: {
            driver: 'postgres',
            host: '127.0.0.1',
            port: 5432,
            username: 'postgres',
            password: '12345',
            database: 'postgres',
        },
        test: {
            driver: 'postgres',
            host: '127.0.0.1',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: '',
        },
        production: {
            driver: 'postgres',
            host: '127.0.0.1',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: '',
        },
    },
}
