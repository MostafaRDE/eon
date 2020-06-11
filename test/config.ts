import Drivers from '../lib/modules/enums/Drivers'

export default {
    connection1: {
        development: {
            driver: Drivers.postgres,
            host: '127.0.0.1',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: '',
        },
        test: {
            driver: Drivers.postgres,
            host: '127.0.0.1',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: '',
        },
        production: {
            driver: Drivers.postgres,
            host: '127.0.0.1',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: '',
        },
    }
}
