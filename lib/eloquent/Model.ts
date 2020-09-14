import ModelTypes from '../modules/enums/ModelTypes'
import DB from '../db/DB'
import IQueryBuilder from '../db/IQueryBuilder'

const pluralize = require('pluralize')

enum TrashStatus
{
    ALL,
    NOT_DELETED,
    DELETED,
}

export interface IModelProperties
{
    [ key: string ]: any
    data: Record<string, any>
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

export default class Model implements IModel, IModelProperties
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

    /*
    |--------------------------------------------------------------------------
    | Config Basic internal connection
    |--------------------------------------------------------------------------
    |
    | This option for config internal connection at first creation action.
    |
    */

    private static baseConfigConnection(model: Model): Model
    {
        model.connection = model.connection.table(model._table)

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
    | Filter for Insert or Update Action
    |--------------------------------------------------------------------------
    |
    | With this option, we can check and validate data for insert or update
    | in the model.
    |
    */

    private static insertOrUpdateFilter(model: Model, item: Record<string, any>): Record<string, any> | undefined
    {
        const keys = Object.keys(item).filter(key => model.fillable.includes(key))
        if (keys.length)
        {
            let allowToInsert = true
            for (let i = 0; i < model.required.length; i++)
            {
                if (!model.required.includes(keys[ i ]))
                {
                    allowToInsert = false
                    break
                }
            }

            if (allowToInsert)
            {
                const temp: Record<string, any> = {}
                keys.forEach(key => temp[ key ] = item[ key ])
                return temp
            }
        }

        return
    }

    /*
    |--------------------------------------------------------------------------
    | Model select method
    |--------------------------------------------------------------------------
    |
    | This option for select a model locally as simple way with your data.
    |
    */

    public static select(...args: string[])
    {
        const model = new this()
        model.connection = model.connection.table(model._table).select(...args)
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

    public static create(item: Record<string, any>)
    {
        const model = new this()
        model.connection = model.connection.table(model._table)

        const temp = Model.insertOrUpdateFilter(model, item)
        if (temp)
            model.columns = temp

        return model
    }

    /*
    |--------------------------------------------------------------------------
    | Model Insert Method
    |--------------------------------------------------------------------------
    |
    | This option for create a model physically as simple way with your data.
    |
    | Saved in database and retrieve model with your data.
    |
    */

    public static insert(items: (Record<string, any> | Record<string, any>[]), options?: Record<string, any>)
    {
        const model = new this()

        let tempItems: (Record<string, any> | Record<string, any>[])
        if (Array.isArray(items))
        {
            tempItems = []

            items.forEach(item =>
            {
                const temp = Model.insertOrUpdateFilter(model, item)
                if (temp)
                    tempItems.push(temp)
            })
        }
        else
        {
            tempItems = {}
            const temp = Model.insertOrUpdateFilter(model, items)
            if (temp)
                tempItems = temp
        }

        return Model.baseConfigConnection(model).connection.insert(tempItems, options)
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

    public static update(items: Record<string, any>): Promise<any>
    {
        const model = new this()

        let tempItems = {}
        const temp = Model.insertOrUpdateFilter(model, items)
        if (temp)
            tempItems = temp

        return Model.baseConfigConnection(model).connection.update(tempItems)
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
        const model = new this()
        return Model.baseConfigConnection(model).connection.delete()
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
        const model = new this()
        return model.connection.table(model._table).where({
            key: model.softDeleteKey,
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
        const model = new this()
        return model.connection.table(model._table).where({
            key: model.softDeleteKey,
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
        const model = new this()
        return model.connection.table(model._table)
    }

    ///////////////////////////////////////////

    protected tableType: ModelTypes = ModelTypes.table

    protected table = ''

    private get _table()
    {
        if (this.table !== '')
            return this.table
        else
            return pluralize(global.changeStringCase(this.constructor.name, 'snake'))
    }

    private set _table(table)
    {
        this.table = table
    }

    protected columns: Record<string, any> = {}

    public data: Record<string, any> = {}

    protected primaryKey: string | Array<string> = 'id'

    protected keyType: string | Array<string> = 'integer'

    protected dates: Array<string> = [ 'created_at', 'updated_at' ]

    protected dateFormat = 'U'

    protected timestamps = true

    protected softDelete = false

    protected softDeleteKey = 'deleted_at'

    protected fillable: Array<string> = []

    protected required: Array<string> = []

    protected guarded: Array<string> = []

    protected hidden: Array<string> = []

    protected incrementing = true

    private trashStatus = TrashStatus.NOT_DELETED

    constructor()
    {
        // console.log('new', new.target.name)
        this.connection = new DB()

        return new Proxy(this, {
            get: (target: any, property: string | number | symbol) => target[ property ],
            set: (target: any, property: string | number | symbol, value: any): boolean =>
            {
                if (target.hasOwnProperty(property))
                    target[ property ] = value
                else
                    target.data[ property ] = value
                return true
            },
        })
    }
}

export function exporter<T extends IModelProperties>(model: any): T
{
    return new model()
}
