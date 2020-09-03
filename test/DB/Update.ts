import con from '../Connection'

con.table('table_name').where({
    key: 'id',
    value: 2,
}).update({ name: 'Mostafa' }).then(console.log)