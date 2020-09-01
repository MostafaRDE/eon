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


    // Sorting
    orderBy(...args: string[]): IQueryBuilder


    // Mutations
    insert(items: (Record<string, any> | Record<string, any>[]), options?: Record<string, any>): any

    update(items: [], options: Record<string, any>): boolean

    delete(): boolean


    // Debugging
    logger(): any
}
