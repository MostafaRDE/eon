export default interface IQueryBuilder
{
    getQuery(): string

    raw(query: string): Promise<any>


    // Collection
    parseResultQuery(result: any): Record<string, any> | []


    // Query
    table(tableName: string): IQueryBuilder

    get(): Promise<Record<string, any> | Record<string, any>[]>

    select(...args: string[]): IQueryBuilder

    distinct(status: boolean): IQueryBuilder

    where(...args: Record<string, any>[]): IQueryBuilder

    returning(...args: string[]): IQueryBuilder


    // Sorting
    orderBy(...args: string[]): IQueryBuilder


    // Mutations
    insert(items: (Record<string, any> | Record<string, any>[]), options?: Record<string, any>): Promise<any>

    update(items: Record<string, any>): Promise<any>

    delete(): Promise<any>


    // Debugging
    logger(): any
}
