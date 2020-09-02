const { Pool } = require('pg')

import { IOptions } from '../Connection'

let connection: any = null

export function getConnection(options: IOptions)
{
    if (!connection)
    {
        console.log(connection)
        connection = new Pool({
            user: options.username,
            host: options.host,
            database: options.database,
            password: options.password,
        })
    }

    return connection
}

export function disconnect(): boolean
{
    if (connection)
    {
        connection.end()
        connection = null
    }

    return true
}