import * as IConnectionImporter from './IConnection'
import * as IQueryBuilderImporter from './IQueryBuilder'
import Drivers from "../modules/enums/Drivers";

export namespace DB
{
    import IConnection = IConnectionImporter.DB.IConnection
    import IQueryBuilder = IQueryBuilderImporter.DB.IQueryBuilder

    export abstract class Connection
        implements IConnection, IQueryBuilder
    {
        protected _connection = null
        protected query = {}

        protected options: {
            driver: Drivers,
            host: string,
            port?: string | number,
            username?: string,
            password?: string,
            database: string,
        } = null

        protected constructor(options?: {
            driver: Drivers,
            host: string,
            port?: string | number,
            username?: string,
            password?: string,
            database: string,
        })
        {
            if (options)
                this.setOptions(options)
        }

        getOptions(): object
        {
            return this.options;
        }

        setOptions(options: {
            driver: Drivers,
            host: string,
            port?: string | number,
            username?: string,
            password?: string,
            database: string,
        }): void
        {
            this.options = options
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

        abstract parseResultQuery(result: any): object|[]

        abstract table(tableName: string): IQueryBuilder;

        abstract get(): Promise<[] | object>;

        abstract select(...args: string[]): IQueryBuilder;

        abstract distinct(status: boolean): IQueryBuilder;

        abstract where(...args: object[]): IQueryBuilder;

        abstract orderBy(...args: string[]): IQueryBuilder;

       abstract insert(items: [], options: object): any;

        abstract update(items: [], options: object): boolean;

        abstract delete(): boolean;

        // </editor-fold>

        // <editor-fold desc="Executor Methods">

        abstract getQuery(): string

        abstract raw(query: string): any

        // </editor-fold>

        // <editor-fold desc="Debugging Methods">

        logger(): any
        {

        }

        // </editor-fold>

    }
}
