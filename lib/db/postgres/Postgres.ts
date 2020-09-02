import Connection from '../Connection'
import { IOptions } from '../Connection'
import IQueryBuilder from '../IQueryBuilder'
import { disconnect, getConnection } from './Connection'
const format = require('pg-format')

const { Pool } = require('pg')

interface IWhere
{
    key: string
    value: string
    operator?: string
    condition?: string
}

interface IQuery
{
    distinct: boolean
    select: string[]
    where: IWhere[]
    orderBy: string[]
}

interface IQueryInsert
{
    columns: string[]
    values: any[]
    returning: string[]
}

interface IInsert
{
    multiple: boolean
}

interface IResult
{
    rows: any[]
}

export default class Postgres extends Connection
{
    _isConnected = false

    query: IQuery = {
        distinct: false,
        select: [],
        where: [],
        orderBy: [],
    }

    queryInsert: IQueryInsert = {
        columns: [],
        values: [],
        returning: [ 'id' ],
    }

    queryUpdate = {
        set: [],
        where: [],
    }

    queryDelete = {
        table: '',
        where: [],
    }

    constructor(options: IOptions)
    {
        super(options)
    }

    // <editor-fold desc="Connection Methods">

    clearConnection()
    {
        // if (this._connection)
        //     this.disconnect()
        super.clearConnection()
    }

    connect(): boolean
    {
        this.restartConnection()

        try
        {
            this._connection.connect((err: any, client: any, release: () => void) =>
            {
                if (err)
                {
                    this._isConnected = false
                    return console.error('Error acquiring client', err.stack)
                }
                client.query('SELECT NOW()', (err2: any) =>
                {
                    release()
                    if (err2)
                    {
                        this._isConnected = false
                        return console.error('Error executing query', err2.stack)
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
        return this._isConnected
    }

    disconnect(): boolean
    {
        return disconnect()
    }

    restartConnection(): void
    {
        this.clearConnection()
        this._connection = getConnection(this.options)
    }

    // </editor-fold>

    // <editor-fold desc="Queries Methods">

    table(tableName: string): IQueryBuilder
    {
        // @ts-ignore
        // const _this = global.clone(this)
        this._table = tableName
        return this
    }

    get(): Promise<[] | Record<string, any>>
    {
        return this.raw(this.getQuery())
            .then((res: IResult) => this.parseResultQuery(res))
    }

    select(...args: string[]): IQueryBuilder
    {
        args.forEach(item => this.query.select.push(item))
        return this
    }

    distinct(status: boolean): IQueryBuilder
    {
        this.query.distinct = status
        return this
    }

    where(...args: { key: string, value: string, operator?: string, condition?: string }[]): IQueryBuilder
    {
        args.forEach(item => this.query.where.push(item))
        return this
    }

    orderBy(...args: string[]): IQueryBuilder
    {
        args.forEach(item => this.query.select.push(item))
        return this
    }

    insert(items: Record<string, any>, options?: IInsert): any
    {
        if (options?.multiple)
        {
            this.queryInsert.columns = items.columns

            items.values.forEach((item: (Record<string, any> | [])) =>
            {
                if (Array.isArray(item))
                    this.queryInsert.values.push(item)
                else
                    this.queryInsert.values.push(this.queryInsert.columns.map(column => item[ column ]))
            })
        }
        else
        {
            this.queryInsert.columns = Object.keys(items)
            this.queryInsert.values.push(Object.values(items))
        }

        const query = format(
            'INSERT INTO %I (%s) VALUES %L returning %s',
            this._table,
            this.queryInsert.columns.join(', '),
            this.queryInsert.values,
            this.queryInsert.returning.join(', '),
        )

        console.log(query)
        return this.raw(query)
            .then((res: IResult) => this.parseResultQuery(res))
    }

    update(items: [], options: Record<string, any>): boolean
    {
        return false
    }

    delete(): boolean
    {
        return false
    }

    // </editor-fold>

    // <editor-fold desc="Executor Methods">

    getQuery(): string
    {

        let query = format(
            'SELECT %s%s FROM %I',
            this.query.distinct ? 'DISTINCT ' : '',
            this.query.select.join(', '),
            this._table,
        )

        if (this.query.where.length)
        {
            const where = this.query.where.map((item: IWhere, index) => `${ item.key } ${ item.operator || '=' } ${ item.value }${ index + 1 < this.query.where.length ? (` ${ item.condition }` || ' AND') : '' }`).join(' ')
            query += ` WHERE ${ where } `
        }

        console.log(query)

        return query
    }

    raw(query: string): Promise<any>
    {
        this.restartConnection()
        return new Promise((resolve, reject) =>
        {
            this._connection.query(query, (err: any, result: any) =>
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

    parseResultQuery(result: IResult): Record<string, any> | []
    {
        return result.rows
    }

    // </editor-fold>

    // <editor-fold desc="Debugging Methods">

    logger(): any
    {
        //
    }

    // </editor-fold>
}
