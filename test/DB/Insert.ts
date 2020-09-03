import con from '../Connection'

con.table('table_name').returning('id', 'name').insert({ name: 'Amir' }).then(console.log)
con.table('table_name').insert({
    columns: [ 'name' ],
    values: [
        [ 'Mostafa' ],
        [ 'Mobina' ],
        [ 'Atefeh' ],
        { name: 'Arefeh' },
    ],
}, { multiple: true }).then(console.log)
