import * as ConnectionImporter from '../Connection'
import * as IQueryBuilderImporter from '../IQueryBuilder'
import Drivers from "../../modules/enums/Drivers";
const { Pool } = require('pg');

export namespace DB.postgres
{
    import Connection = ConnectionImporter.DB.Connection
    import IQueryBuilder = IQueryBuilderImporter.DB.IQueryBuilder

    export class Postgres extends Connection
    {
        _isConnected = false

        constructor(options?: {
            driver: Drivers,
            host: string,
            port?: string | number,
            username?: string,
            password?: string,
            database: string,
        })
        {
            super(options)
            this.restartConnection()
            this.connect()
        }

        clearConnection()
        {
            if (this._connection)
                this._connection.end()
            super.clearConnection()
        }

        connect(): boolean
        {
            try
            {
                this._connection.connect((err, client, release) => {
                    if (err) {
                        this._isConnected = false
                        return console.error('Error acquiring client', err.stack)
                    }
                    client.query('SELECT NOW()', (err, result) => {
                        release()
                        if (err) {
                            this._isConnected = false
                            return console.error('Error executing query', err.stack)
                        }
                        this._isConnected = true
                    })
                })

                return true
            }
            catch (e)
            {
                console.error(e)
                this._isConnected = false
                return false
            }
        }

        isConnected(): boolean
        {
            return this._isConnected;
        }

        disconnect(): boolean
        {
            return false;
        }

        // Query Builder

        all(): [] | object
        {
            return undefined;
        }

        crossJoin(): IQueryBuilder
        {
            return undefined;
        }

        delete(): boolean
        {
            return false;
        }

        find(): [] | object
        {
            return [];
        }

        first(): IQueryBuilder
        {
            return undefined;
        }

        get(): [] | object
        {
            return [];
        }

        groupBy(): IQueryBuilder
        {
            return undefined;
        }

        having(): IQueryBuilder
        {
            return undefined;
        }

        innerJoin(): IQueryBuilder
        {
            return undefined;
        }

        insert(): IQueryBuilder
        {
            return undefined;
        }

        join(): IQueryBuilder
        {
            return undefined;
        }

        latest(): IQueryBuilder
        {
            return undefined;
        }

        leftJoin(): IQueryBuilder
        {
            return undefined;
        }

        orWhere(): IQueryBuilder
        {
            return undefined;
        }

        orderBy(): IQueryBuilder
        {
            return undefined;
        }

        restartConnection(): void
        {
            this.clearConnection()

            this._connection = new Pool({
                user: this.options.username,
                host: this.options.host,
                database: this.options.database,
                password: this.options.password,
            });
        }

        rightJoin(): IQueryBuilder
        {
            return undefined;
        }

        select(): IQueryBuilder
        {
            return undefined;
        }

        table(): IQueryBuilder
        {
            return undefined;
        }

        union(): IQueryBuilder
        {
            return undefined;
        }

        update(): boolean
        {
            return false;
        }

        where(): IQueryBuilder
        {
            return undefined;
        }

        whereBetween(): IQueryBuilder
        {
            return undefined;
        }

        whereIn(): IQueryBuilder
        {
            return undefined;
        }

        whereNotBetween(): IQueryBuilder
        {
            return undefined;
        }

        whereNotIn(): IQueryBuilder
        {
            return undefined;
        }

        whereNotNull(): IQueryBuilder
        {
            return undefined;
        }

        whereNull(): IQueryBuilder
        {
            return undefined;
        }

    }
}
