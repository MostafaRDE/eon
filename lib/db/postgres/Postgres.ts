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

        query = {
            table: '',
            distinct: false,
            select: [],
            where: [],
            orderBy: [],
        }

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

        // <editor-fold desc="Connection Methods">

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
                this._connection.connect((err, client, release) =>
                {
                    if (err)
                    {
                        this._isConnected = false
                        return console.error('Error acquiring client', err.stack)
                    }
                    client.query('SELECT NOW()', (err, result) =>
                    {
                        release()
                        if (err)
                        {
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

        // </editor-fold>

        // <editor-fold desc="Queries Methods">

        table(tableName: string): IQueryBuilder
        {
            this.query.table = tableName
            return this
        }

        get(): Promise<[] | object>
        {

            return this.raw(this.getQuery())
                .then(res => this.parseResultQuery(res))

        }

        select(...args: string[]): IQueryBuilder
        {
            args.forEach(item => this.query.select.push(item))
            return this;
        }

        distinct(status: boolean): IQueryBuilder
        {
            this.query.distinct = status
            return this;
        }

        where(...args: {key: string, operator?: string, value: string, condition?: string}[]): IQueryBuilder
        {
            args.forEach(item => this.query.where.push(item))
            return this;
        }

        orderBy(...args: string[]): IQueryBuilder
        {
            args.forEach(item => this.query.select.push(item))
            return this;
        }

        insert(): IQueryBuilder
        {
            return undefined;
        }

        update(): boolean
        {
            return false;
        }

        delete(): boolean
        {
            return false;
        }

        // </editor-fold>

        // <editor-fold desc="Executor Methods">

        getQuery(): string
        {
            let query = '';
            let select = `${this.query.distinct ? 'DISTINCT' : ''}${this.query.select.join(', ')}`;
            query += `SELECT ${select} FROM ${this.query.table}`;
            if (this.query.where.length) {
                let where: any = this.query.where.map((item, index) => `${item.key} ${item.operator || '='} ${item.value}${index + 1 < this.query.where.length ? (` ${item.condition}` || ' AND') : ''}`).join(' ')
                query += ` ${where} `
            }
            return query;
        }

        raw(query?: string): any
        {
            return new Promise((resolve, reject) => {
                this._connection.query(query, (err, result) =>
                {
                    if (err)
                    {
                        this._isConnected = false
                        reject(err)
                        return console.error('Error executing query => ', err.stack)
                    }
                    else
                    {
                        resolve(result)
                    }
                })
            })
        }

        parseResultQuery(result: any): object | []
        {
            return result.rows;
        }

        // </editor-fold>
    }
}
