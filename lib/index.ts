import './_helpers'
import DB from './db/DB'
import IQueryBuilder from './db/IQueryBuilder'
import Model from './eloquent/Model'
import Drivers from './modules/enums/Drivers'
import ModelTypes from './modules/enums/ModelTypes'

export default {
    DB,
    Model,
    // interfaces: {
    //     IQueryBuilder,
    // },
    enums: {
        Drivers,
        ModelTypes,
    },
}
