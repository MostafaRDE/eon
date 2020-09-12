import '../../index'
import Model from '../../lib/eloquent/Model'

export default class User extends Model
{
    fillable = [
        'name',
    ]

    guarded = [
        'password',
    ]

    required = [
        'name',
    ]

    hidden = [
        'password',
    ]
}

User.insert({
    name: 'Mostafa',
}).then(console.log)

User.insert({
    name: 'Mobina',
}).then(console.log)
