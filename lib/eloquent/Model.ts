import ModelTypes from '../modules/enums/ModelTypes'
import DB from '../db/DB'
import GettersSetters from '../modules/GettersSetters'
import IQueryBuilder from '../db/IQueryBuilder'

enum TrashStatus
{
    ALL,
    NOT_DELETED,
    DELETED,
}

interface IModel
{
    /*
    |--------------------------------------------------------------------------
    | Static methods
    |--------------------------------------------------------------------------
    |
    | This option for create a model locally as simple way with your data.
    |
    | methods:
    |   create(),  insert(), update(), destroy(), withTrashed()
    |
    */

    // take(count: number)
    //
    // paginate(page: number, size: number)
    //
    // count(): number
    //
    // max(): number
    //
    // refresh()
    //
    // fill(data: object)
    //
    // save(): boolean
    //
    // delete(): boolean
    //
    // softDelete(): boolean
    //
    // forceDelete(): boolean
    //
    // restore(): boolean
    //
    // logger(): any
}

export default class Model extends GettersSetters implements IModel
{
    /*
    |--------------------------------------------------------------------------
    | Model connection
    |--------------------------------------------------------------------------
    |
    | This option for create a model locally as simple way with your data.
    |
    */

    public connection: IQueryBuilder

    private static baseConfigConnection(model: Model): Model
    {
        model.connection = model.connection.table(model.table)

        if (model.softDelete)
            switch (model.trashStatus)
            {
                case TrashStatus.DELETED:
                    model.connection = model.connection.where({
                        key: model.softDeleteKey,
                        value: 'is not null',
                        isStringFormat: false,
                    })
                    break

                case TrashStatus.NOT_DELETED:
                    model.connection = model.connection.where({
                        key: model.softDeleteKey,
                        value: 'is null',
                        isStringFormat: false,
                    })
                    break
            }

        return model
    }

    /*
    |--------------------------------------------------------------------------
    | Model create method
    |--------------------------------------------------------------------------
    |
    | This option for create a model locally as simple way with your data.
    |
    */

    public static create()
    {
        const temp = new this()
        temp.connection.table(temp.table)
        return temp
    }

    /*
    |--------------------------------------------------------------------------
    | Model insert method
    |--------------------------------------------------------------------------
    |
    | This option for create a model physically as simple way with your data.
    |
    | Saved in database and retrieve model with your data.
    |
    */

    public static insert(items: (Record<string, any> | Record<string, any>[]), options?: Record<string, any>)
    {
        const temp = new this()
        return Model.baseConfigConnection(temp).connection.insert(items, options)
    }

    /*
    |--------------------------------------------------------------------------
    | Model update method
    |--------------------------------------------------------------------------
    |
    | This option for update a model physically as simple way with your data.
    |
    | Updated row in your database with primary key in this model.
    |
    */

    public static update (items: Record<string, any>): Promise<any>
    {
        const temp = new this()
        return Model.baseConfigConnection(temp).connection.update(items)
    }

    /*
    |--------------------------------------------------------------------------
    | Model destroy method
    |--------------------------------------------------------------------------
    |
    | This option for delete a model physically as simple way with your
    | primary key(s).
    |
    | deleted row(s) in your database with primary key in this model.
    |
    */

    public static delete(): Promise<any>
    {
        const temp = new this()
        return Model.baseConfigConnection(temp).connection.delete()
    }

    /*
    |--------------------------------------------------------------------------
    | Model trashed method
    |--------------------------------------------------------------------------
    |
    | This option for retrieve soft deleted rows from database.
    |
    */

    public static trashed()
    {
        const temp = new this()
        return temp.connection.table(temp.table).where({
            key: temp.softDeleteKey,
            value: 'is not null',
            isStringFormat: false,
        })
    }

    /*
    |--------------------------------------------------------------------------
    | Model not in trash method
    |--------------------------------------------------------------------------
    |
    | This option for retrieve soft deleted rows from database.
    |
    */

    public static notInTrash()
    {
        const temp = new this()
        return temp.connection.table(temp.table).where({
            key: temp.softDeleteKey,
            value: 'is null',
            isStringFormat: false,
        })
    }

    /*
    |--------------------------------------------------------------------------
    | Model withTrashed method
    |--------------------------------------------------------------------------
    |
    | This option for retrieve rows from database with softDeleted rows.
    |
    */

    public static withTrashed()
    {
        const temp = new this()
        return temp.connection.table(temp.table)
    }

    ///////////////////////////////////////////

    protected tableType: ModelTypes = ModelTypes.table

    protected _table = ''

    protected get table()
    {
        if (this._table !== '')
            return this._table
        else
            return global.changeStringCase(this.constructor.name, 'snake')
    }

    protected set table(table)
    {
        this._table = table
    }

    protected columns: Record<string, any> = {}

    protected data: Record<string, any> = {}

    protected primaryKey: string|Array<string> = 'id'

    protected keyType: string|Array<string> = 'integer'

    protected dates: Array<string> = [ 'created_at', 'updated_at' ]

    protected dateFormat = 'U'

    protected timestamps = true

    protected softDelete = false

    protected softDeleteKey = 'deleted_at'

    protected fillable: Array<string> = []

    protected guarded: Array<string> = []

    protected hidden: Array<string> = []

    protected incrementing = true

    private trashStatus = TrashStatus.NOT_DELETED

    protected constructor()
    {
        super()

        // console.log('new', new.target.name)
        this.connection = new DB()
    }
}
