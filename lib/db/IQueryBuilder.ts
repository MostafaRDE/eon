export namespace DB
{
    export interface IQueryBuilder
    {
        getQuery(): string

        raw(query?: string): any


        // Collection
        parseResultQuery(result: any): object|[]


        // Query
        table(tableName: string): IQueryBuilder

        get(): Promise<[] | object>

        select(...args: string[]): IQueryBuilder

        distinct(status: boolean): IQueryBuilder

        where(...args: object[]): IQueryBuilder


        // Sorting
        orderBy(...args: string[]): IQueryBuilder


        // Mutations
        insert(): IQueryBuilder

        update(): boolean

        delete(): boolean
    }
}
