import Drivers from '../modules/enums/Drivers'
import * as ConnectionImporter from "./Connection";
import * as IQueryBuilderImporter from "./IQueryBuilder";
import * as PostgresConnectionImporter from "./postgres/Postgres";

export namespace DB
{
    import Connection = ConnectionImporter.DB.Connection;
    import IQueryBuilder = IQueryBuilderImporter.DB.IQueryBuilder;
    import Postgres = PostgresConnectionImporter.DB.postgres.Postgres;

    export class DB implements IQueryBuilder
    {
        private options: object
        private readonly connection: Connection = null

        constructor(options: {
            driver: Drivers,
            host: string,
            port?: string | number,
            username?: string,
            password?: string,
            database: string,
        })
        {
            this.options = options

            switch (options.driver)
            {
                case Drivers.postgres:
                    this.connection = new Postgres(options)
                    break
            }
        }

        connectionChecker()
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

        parseResultQuery(result: any): object|[]
        {
            this.connection.parseResultQuery(result)
            return this;
        }

        table(tableName: string): IQueryBuilder
        {
            this.connection.table(tableName)
            return this;
        }

        get(): Promise<[] | object>
        {
            return this.connection.get();
        }

        select(...args: string[]): IQueryBuilder
        {
            this.connection.select(...args)
            return this;
        }

        distinct(status: boolean = true): IQueryBuilder
        {
            this.connection.distinct(status)
            return this;
        }

        where(...args: {key: string, operator?: string, value: string, condition?: string}[]): IQueryBuilder
        {
            this.connection.where(...args)
            return this;
        }

        orderBy(...args: string[]): IQueryBuilder
        {
            this.connection.orderBy(...args)
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
            return this.connection.getQuery();
        }

        raw(query?: string): any
        {
            return this.connection.raw(query);
        }

        // </editor-fold>
    }
}
