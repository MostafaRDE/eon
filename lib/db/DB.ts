import Drivers from '../modules/enums/Drivers'
import * as IQueryBuilderImporter from "./IQueryBuilder";

export namespace DB
{
    import IQueryBuilder = IQueryBuilderImporter.DB.IQueryBuilder;

    // export class DB implements IQueryBuilder
    // {
    //     private options: object
    //
    //     constructor(options: {
    //         driver: Drivers,
    //         host: string,
    //         port?: string | number,
    //         username?: string,
    //         password?: string,
    //         database: string,
    //     })
    //     {
    //         this.options = options
    //     }
    // }
}
