const { Pool } = require('pg')

import { IOptions } from '../Connection'

let connection: any = null

export function getConnection(options: IOptions)
{
    if (!connection)
        connection = new Pool({
            user: options.username,
            host: options.host,
            database: options.database,
            password: options.password,
        })

    return connection
}