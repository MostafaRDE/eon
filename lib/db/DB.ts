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
        private connection: Connection = null

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

        all(): [] | object
        {
            if (this.connectionChecker())
            {
                return {}
            }
            else
            {
                throw ''
            }
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
            return undefined;
        }

        first(): IQueryBuilder
        {
            return undefined;
        }

        get(): [] | object
        {
            return undefined;
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
