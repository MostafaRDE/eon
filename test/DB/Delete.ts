import con from '../Connection'

con.table('table_name')
    .whereConfig({ condition: 'OR' })
    .whereSimple({ id: [ 9, 10, 11, 12, 13 ] })
    .whereSimple({ id: 15 })
    .delete()
    .then(console.log)