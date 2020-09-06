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

    hidden = [
        'password',
    ]
}

User.create()
