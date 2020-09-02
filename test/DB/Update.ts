import eon from '../../lib'
import config from '../config'

const con = new eon.DB(config.connection1.development)

con.table('table_name').where({
    key: 'id',
    value: 2,
}).update({ name: 'Mostafa' }).then(console.log)