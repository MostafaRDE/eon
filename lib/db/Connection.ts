import IConnection from './IConnection'
import IQueryBuilder from './IQueryBuilder'
import Drivers from '../modules/enums/Drivers'

export interface IOptions
{
    driver: Drivers
    host: string
    port?: string | number
    username?: string
    password?: string
    database: string
}

export default abstract class Connection implements IConnection, IQueryBuilder
{
    protected _connection: any = null
    protected _table: string = ''
    protected query = {}
    protected queryInsert = {}
    protected queryUpdate = {}
    protected queryDelete = {}

    protected _options: IOptions = {
        driver: Drivers.postgres,
        host: '127.0.0.1',
        database: 'test',
    }

    protected constructor(options: IOptions)
    {
        if (options)
            this.options = options
    }

    get options(): (IOptions)
    {
        return this._options
    }

    set options(options: IOptions)
    {
        this._options = options
    }


    // DB.IConnection
    // <editor-fold desc="Connection Methods">

    clearConnection(): void
    {
        this._connection = null
    }

    abstract connect(): boolean

    abstract disconnect(): boolean

    getConnection()
    {
        return this
    }

    abstract isConnected(): boolean

    abstract restartConnection(): void

    // </editor-fold>

    // <editor-fold desc="Queries Methods">

    abstract parseResultQuery(result: any): Record<string, unknown> | []

    abstract table(tableName: string): IQueryBuilder

    abstract get(): Promise<[] | Record<string, unknown>>

    abstract select(...args: string[]): IQueryBuilder

    abstract distinct(status: boolean): IQueryBuilder

    abstract where(...args: Record<string, unknown>[]): IQueryBuilder

    abstract orderBy(...args: string[]): IQueryBuilder

    abstract insert(items: Record<string, any>, options?: Record<string, any>): any

    abstract update(items: Record<string, any>, options?: Record<string, any>): boolean

    abstract delete(): boolean;

    // </editor-fold>

    // <editor-fold desc="Executor Methods">

    abstract getQuery(): string

    abstract raw(query: string): any

    // </editor-fold>

    // <editor-fold desc="Debugging Methods">

    logger(): void
    {
        //
    }

    // </editor-fold>

}
