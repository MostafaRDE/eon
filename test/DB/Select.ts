import con from '../Connection'

const a = con.table('table_name').select('*').where({ key: 'id', value: 1 })
console.log(con.table('a').with('a', a.getQuery()).select('*').where({ key: 'id', value: 1 }).getQuery())
// con.table('table_name').with('a', a).select('*').where({ key: 'id', value: 1 }).get().then(console.log)
// con.table('table_name').select('*').where({ key: 'id', value: 1 }).get().then(console.log)
// con.table('table_name').select('*').where({ key: 'id', value: 1 }).get().then(console.log)
// con.table('table_name').select('*').whereSimple({ id: 1 }).get().then(console.log)
// con.table('table_name').select('*').whereSimple({ id: 1 }).first().then(console.log)
// con.table('table_name').select('*').whereSimple({ id: 100000 }).first().then(console.log)
// con.table('table_name').select('*').limit(4).offset(1).orderBy('id').get().then(console.log)
// console.log(
//     con.table('table_name')
//         .select('*')
//         .innerJoin('table_name.a', '=', 'table_name.b')
//         .leftJoin('table_name.c', '=', 'table_name.d')
//         .whereSimple({ id: 100000 })
//         .orderBy('id DESC', 'name')
//         .getQuery(),
// )
//
// con.raw('SELECT NOW()').then((res: any) => console.log(res.rows))
