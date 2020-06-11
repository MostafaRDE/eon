import * as IConnectionImporter from './IConnection'
import * as IQueryBuilderImporter from './IQueryBuilder'

export namespace DB
{
    import IConnection = IConnectionImporter.DB.IConnection
    import IQueryBuilder = IQueryBuilderImporter.DB.IQueryBuilder

    export abstract class Connection
        implements IConnection, IQueryBuilder
    {
        // DB.IConnection

        abstract clearConnection(): void

        abstract connect(): boolean

        abstract disconnect(): boolean

        abstract getConnection(): IConnection

        abstract isConnected(): boolean

        abstract restartConnection(): void

        // DB.IQueryBuilder

        abstract delete()

        abstract insert()

        abstract select()

        abstract update()

        abstract where()
    }
}
