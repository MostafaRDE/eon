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


        // DB.IConnection

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

        abstract all(): [] | object;

        abstract crossJoin(): IQueryBuilder;

        abstract delete(): boolean;

        abstract find(): [] | object;

        abstract first(): IQueryBuilder;

        abstract get(): [] | object;

        abstract groupBy(): IQueryBuilder;

        abstract having(): IQueryBuilder;

        abstract innerJoin(): IQueryBuilder;

        abstract insert(): IQueryBuilder;

        abstract join(): IQueryBuilder;

        abstract latest(): IQueryBuilder;

        abstract leftJoin(): IQueryBuilder;

        abstract orWhere(): IQueryBuilder;

        abstract orderBy(): IQueryBuilder;

        abstract rightJoin(): IQueryBuilder;

        abstract select(): IQueryBuilder;

        abstract table(): IQueryBuilder;

        abstract union(): IQueryBuilder;

        abstract update(): boolean;

        abstract where(): IQueryBuilder;

        abstract whereBetween(): IQueryBuilder;

        abstract whereIn(): IQueryBuilder;

        abstract whereNotBetween(): IQueryBuilder;

        abstract whereNotIn(): IQueryBuilder;

        abstract whereNotNull(): IQueryBuilder;

        abstract whereNull(): IQueryBuilder;

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

        // DB.IQueryBuilder
    }
}
