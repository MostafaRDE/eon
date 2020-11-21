import con from '../Connection'

con.table('table_name').select('*').where({ key: 'id', value: 1 }).get().then(console.log)
con.table('table_name').select('*').where({ key: 'id', value: 1 }).get().then(console.log)
con.table('table_name').select('*').whereSimple({ id: 1 }).get().then(console.log)
con.table('table_name').select('*').whereSimple({ id: 1 }).first().then(console.log)
con.table('table_name').select('*').whereSimple({ id: 100000 }).first().then(console.log)
console.log(
    con.table('table_name')
        .select('*')
        .innerJoin('table_name.a', '=', 'table_name.b')
        .leftJoin('table_name.c', '=', 'table_name.d')
        .whereSimple({ id: 100000 })
        .orderBy('id DESC', 'name')
        .getQuery(),
)

con.raw('SELECT NOW()').then((res: any) => console.log(res.rows))
