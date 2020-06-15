import * as DB from './db/DB'
import config from '../test/config'
import * as IQueryBuilderImporter from "./db/IQueryBuilder";
import IQueryBuilder = IQueryBuilderImporter.DB.IQueryBuilder;

let con: IQueryBuilder = new DB.DB.DB(config.connection1.development)

con = con.table('users').select('*')
    .where(
        {key: 'id', operator: '<>', value: `'1'`, condition: 'OR'},
        {key: 'id', operator: '<>', value: `'2'`, condition: 'OR'}
        )

// con.raw('SELECT NOW()').then(res => console.log(res.rows))
console.log(con.getQuery())
