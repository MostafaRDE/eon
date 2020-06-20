import ModelTypes from "../modules/enums/ModelTypes"
import * as DBImporter from "../db/DB"

export namespace DB
{
    import DBClass = DBImporter.DB.DB

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

    export abstract class Model implements IModel
    {
        /*
        |--------------------------------------------------------------------------
        | Model connection
        |--------------------------------------------------------------------------
        |
        | This option for create a model locally as simple way with your data.
        |
        */

        static connection: DBClass

        /*
        |--------------------------------------------------------------------------
        | Model create method
        |--------------------------------------------------------------------------
        |
        | This option for create a model locally as simple way with your data.
        |
        */

        static create()
        {

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

        static insert()
        {

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

        static update()
        {

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

        static destroy()
        {

        }

        /*
        |--------------------------------------------------------------------------
        | Model trashed method
        |--------------------------------------------------------------------------
        |
        | This option for retrieve soft deleted rows from database.
        |
        */

        static trashed()
        {

        }

        /*
        |--------------------------------------------------------------------------
        | Model withTrashed method
        |--------------------------------------------------------------------------
        |
        | This option for retrieve rows from database with softDeleted rows.
        |
        */

        static withTrashed()
        {

        }

        ///////////////////////////////////////////

        protected tableType: ModelTypes = ModelTypes.table

        protected table: string = null

        protected columns: {}

        protected data: {}

        protected primaryKey: string|Array<string> = 'id'

        protected keyType: string|Array<string> = 'integer'

        protected dates: Array<string> = ['created_at', 'updated_at']

        protected dateFormat: string = 'U'

        protected timestamps: boolean = true

        protected fillable: Array<string> = []

        protected guarded: Array<string> = []

        protected hidden: Array<string> = []

        protected incrementing: boolean = true

        protected constructor(data: {})
        {
            this.columns = Object.keys(this.data)
            this.data = data
        }

    }
}
