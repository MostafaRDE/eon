export interface IWhere
{
    key: string
    value: any
    operator?: string
    condition?: string
    isStringFormat?: boolean
}

export interface IWhereConfig
{
    operator?: string
    condition?: string
}

export default interface IQueryBuilder
{
    getQuery(): string

    raw(query: string): Promise<any>


    // Collection
    parseResultQuery(result: any): any[]


    // Query
    table(tableName: string): IQueryBuilder

    get(): Promise<Record<string, any>[]>

    first(): Promise<Record<string, any>>

    select(...args: string[]): IQueryBuilder

    distinct(status: boolean): IQueryBuilder

    whereConfig(config: IWhereConfig): IQueryBuilder

    where(...args: IWhere[]): IQueryBuilder

    whereSimple(wheres: Record<string, any>): IQueryBuilder

    returning(...args: string[]): IQueryBuilder


    // Sorting
    orderBy(...args: string[]): IQueryBuilder


    // Joins
    join(source: 'string', condition: Record<string, any>, options?: Record<string, any>): IQueryBuilder


    // Mutations
    insert(items: (Record<string, any> | Record<string, any>[]), options?: Record<string, any>): Promise<any>

    update(items: Record<string, any>): Promise<any>

    delete(): Promise<any>


    // Debugging
    logger(): any
}
