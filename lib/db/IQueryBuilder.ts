export namespace DB
{
    export interface IQueryBuilder
    {
        // Collection
        table(): IQueryBuilder


        // Query
        get(): [] | object

        all(): [] | object

        select(): IQueryBuilder

        find(): [] | object

        first(): IQueryBuilder

        latest(): IQueryBuilder

        where(): IQueryBuilder

        whereBetween(): IQueryBuilder

        whereNotBetween(): IQueryBuilder

        whereIn(): IQueryBuilder

        whereNotIn(): IQueryBuilder

        whereNull(): IQueryBuilder

        whereNotNull(): IQueryBuilder

        orWhere(): IQueryBuilder

        join(): IQueryBuilder

        crossJoin(): IQueryBuilder

        innerJoin(): IQueryBuilder

        leftJoin(): IQueryBuilder

        rightJoin(): IQueryBuilder

        union(): IQueryBuilder


        // Sorting
        orderBy(): IQueryBuilder


        // Mutations
        insert(): IQueryBuilder

        update(): boolean

        delete(): boolean


        // Computational
        groupBy(): IQueryBuilder

        having(): IQueryBuilder
    }
}
