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

export interface IJoin
{
    type?: string
    table: string
    key: string
    operation?: string
    value: string
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

    with(name: string, query: string, recursive?: boolean): IQueryBuilder


    // Sorting
    orderBy(...args: string[]): IQueryBuilder


    // Paging
    offset(count: number): IQueryBuilder

    limit(count: number): IQueryBuilder

    skip(count: number): IQueryBuilder

    take(count: number): IQueryBuilder


    // Joins
    join(table: string, key: string, operation: string, keyB: string, type?: string): IQueryBuilder

    innerJoin(table: string, key: string, operation: string, value: string): IQueryBuilder

    leftJoin(table: string, key: string, operation: string, value: string): IQueryBuilder

    rightJoin(table: string, key: string, operation: string, value: string): IQueryBuilder

    fullJoin(table: string, key: string, operation: string, value: string): IQueryBuilder


    // Mutations
    insert(items: (Record<string, any> | Record<string, any>[]), options?: Record<string, any>): Promise<any>

    update(items: Record<string, any>): Promise<any>

    delete(): Promise<any>


    // Debugging
    logger(): any
}
