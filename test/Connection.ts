import eon from '../lib'
import config from './config'

export default new eon.DB(config.connection1.development)


// let con = new eon.DB(config.connection1.development)
// let data = con.table('table_name').select('*')
//     .get().then(console.log)
// con.raw('SELECT NOW()').then(res => console.log(res.rows))
// console.log(data)
