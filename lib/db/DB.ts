const fs = require('fs')
const findUp = require('find-up')
import Drivers from '../modules/enums/Drivers'
import Connection from './Connection'
import { IOptions } from './Connection'
import IQueryBuilder from './IQueryBuilder'
import { IWhere, IWhereConfig } from './IQueryBuilder'
import Postgres from './postgres/Postgres'

export default class DB implements IQueryBuilder
{

    public static getConnection(path: string): DB
    {
        // @ts-ignore
        return new DB(DB.getOptions(path))
    }

    private static getOptions(path?: string)
    {
        let options = {}, config = {}, configPath = findUp.sync([ '.eonrc.json' ])

        if (configPath)
        {
            // @ts-ignore
            config = JSON.parse(fs.readFileSync(configPath))
        }
        else
        {
            configPath = findUp.sync([ '.eonrc.js' ])
            if (configPath)
                config = require(configPath)
        }

        // @ts-ignore
        options = config

        if (path)
        {
            // @ts-ignore
            path.split('.').forEach(item => { options = options[ item ] })
        }
        else
        {
            // @ts-ignore
            config.default.split('.').forEach(item => { options = options[ item ] })
        }

        return options
    }

    ///////////////////////////////////////////

    private readonly options: IOptions
    // @ts-ignore
    private readonly connection: Connection

    private readonly cloneDeep = 3

    constructor(options?: IOptions)
    {
        if (!options)
            // @ts-ignore
            this.options = DB.getOptions()
        else
            // @ts-ignore
            this.options = options

        // @ts-ignore
        switch (Drivers[ this.options?.driver ])
        {
            case Drivers.postgres:
                // @ts-ignore
                this.connection = new Postgres(this.options)
                this.connection.connect()
                break
        }
    }

    connectionChecker(): boolean
    {
        if (this.connection)
        {
            if (this.connection.isConnected())
                return true
            else
                throw ''
        }
        else
        {
            throw ''
        }
    }

    // <editor-fold desc="Queries Methods">

    parseResultQuery(result: any): any
    {
        this.connection.parseResultQuery(result)
        return this
    }

    table(tableName: string): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.table(tableName)
        return _this
    }

    get(): Promise<any[]>
    {
        return this.connection.get()
    }

    first(): Promise<Record<string, any>>
    {
        return this.connection.first()
    }

    select(...args: string[]): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.select(...args)
        return _this
    }

    distinct(status = true): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.distinct(status)
        return _this
    }

    whereConfig(config: IWhereConfig): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.whereConfig(config)
        return _this
    }

    where(...args: IWhere[]): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.where(...args)
        return _this
    }

    whereSimple(wheres: Record<string, any>): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.whereSimple(wheres)
        return _this
    }

    returning(...args: string[]): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.returning(...args)
        return _this
    }

    with(name: string, query: string, recursive?: boolean): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.with(name, query, recursive)
        return _this
    }

    orderBy(...args: string[]): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.orderBy(...args)
        return _this
    }

    offset(count: number): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.offset(count)
        return _this
    }

    limit(count: number): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.limit(count)
        return _this
    }

    skip(count: number): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.skip(count)
        return _this
    }

    take(count: number): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.take(count)
        return _this
    }

    join(table: string, key: string, operation: string, value: string, type = 'INNER'): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.join(table, key, operation, value, type)
        return _this
    }

    innerJoin(table: string, key: string, operation: string, value: string): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.innerJoin(table, key, operation, value)
        return _this
    }

    leftJoin(table: string, key: string, operation: string, value: string): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.leftJoin(table, key, operation, value)
        return _this
    }

    rightJoin(table: string, key: string, operation: string, value: string): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.rightJoin(table, key, operation, value)
        return _this
    }

    fullJoin(table: string, key: string, operation: string, value: string): IQueryBuilder
    {
        const _this = global.clone(this, this.cloneDeep)
        _this.connection.fullJoin(table, key, operation, value)
        return _this
    }

    insert(items: Record<string, any>, options?: Record<string, any>): Promise<any>
    {
        const _this = global.clone(this, this.cloneDeep)
        return _this.connection.insert(items, options)
    }

    update(items: Record<string, any>): Promise<any>
    {
        const _this = global.clone(this, this.cloneDeep)
        return _this.connection.update(items)
    }

    delete(): Promise<any>
    {
        const _this = global.clone(this, this.cloneDeep)
        return _this.connection.delete()
    }

    // </editor-fold>

    // <editor-fold desc="Executor Methods">

    getQuery(): string
    {
        return this.connection.getQuery()
    }

    raw(query: string): any
    {
        return this.connection.raw(query)
    }

    // </editor-fold>

    // <editor-fold desc="Debugging Methods">

    logger(): any
    {
        //
    }

    // </editor-fold>
}
