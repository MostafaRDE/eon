import * as DBImporter from "./db/DB"
import * as IQueryBuilderImporter from "./db/IQueryBuilder"
import * as ModelImporter from "./eloquent/Model"
import Drivers from "./modules/enums/Drivers"
import ModelTypes from "./modules/enums/ModelTypes"

export default {
    DB: DBImporter.DB.DB,
    Model: ModelImporter.DB.Model,
    interfaces: {
        IQueryBuilder: IQueryBuilderImporter,
    },
    enums: {
        Drivers,
        ModelTypes,
    },
}

abstract class Index
{
    constructor()
    {
        console.log(this.constructor.call('table').table)
    }
    protected table = ''
}

class Class extends Index
{
    table = 'a'
}

new Class()
