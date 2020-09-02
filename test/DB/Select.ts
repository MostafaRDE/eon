import eon from '../../lib'
import config from '../config'

const con = new eon.DB(config.connection1.development)

con.table('table_name').select('*').where({ key: 'id', value: 1 }).get().then(console.log)
// con.table('table_name').select('*').where({ id: 1 }).get().then(console.log)

con.raw('SELECT NOW()').then((res: any) => console.log(res.rows))
