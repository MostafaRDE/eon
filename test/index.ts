import * as DB from './db/DB'
import config from '../test/config'
import * as IQueryBuilderImporter from "./db/IQueryBuilder";
import IQueryBuilder = IQueryBuilderImporter.DB.IQueryBuilder;

let con: IQueryBuilder = new DB.DB.DB(config.connection1.development)

// users 'dsd', 'dfdf', 'gfgfg'
let data = con.table('table_name').select('*')
    .get().then(console.log)
// con.raw('SELECT NOW()').then(res => console.log(res.rows))
// console.log(data)
