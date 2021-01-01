import IConnection from './IConnection'
import IQueryBuilder from './IQueryBuilder'
import { IWhere, IWhereConfig } from './IQueryBuilder'
import Drivers from '../modules/enums/Drivers'

export interface IOptions
{
    driver: (Drivers | string)
    host: string
    port?: string | number
    username?: string
    password?: string
    database: string
}

export default abstract class Connection implements IConnection, IQueryBuilder
{
    protected _connection: any = null
    protected _table = ''
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

    abstract parseResultQuery(result: any): any[]

    abstract table(tableName: string): IQueryBuilder

    abstract get(): Promise<any[]>

    abstract first(): Promise<Record<string, any>>

    abstract select(...args: string[]): IQueryBuilder

    abstract distinct(status: boolean): IQueryBuilder

    abstract whereConfig(config: IWhereConfig): IQueryBuilder

    abstract where(...args: IWhere[]): IQueryBuilder

    abstract whereSimple(wheres: Record<string, any>): IQueryBuilder

    abstract returning(...args: string[]): IQueryBuilder

    abstract with(name: string, query: string, recursive?: boolean): IQueryBuilder

    abstract orderBy(...args: string[]): IQueryBuilder

    abstract offset(count: number): IQueryBuilder

    abstract limit(count: number): IQueryBuilder

    abstract skip(count: number): IQueryBuilder

    abstract take(count: number): IQueryBuilder

    abstract join(keyA: string, operation: string, keyB: string, type?: string): IQueryBuilder
    abstract innerJoin(keyA: string, operation: string, keyB: string): IQueryBuilder
    abstract leftJoin(keyA: string, operation: string, keyB: string): IQueryBuilder
    abstract rightJoin(keyA: string, operation: string, keyB: string): IQueryBuilder
    abstract fullJoin(keyA: string, operation: string, keyB: string): IQueryBuilder

    abstract insert(items: Record<string, any>, options?: Record<string, any>): Promise<any>

    abstract update(items: Record<string, any>): Promise<any>

    abstract delete(): Promise<any>

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
