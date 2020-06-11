export namespace DB
{
    export interface IConnection
    {
        clearConnection(): void
        connect(): boolean
        disconnect(): boolean
        getConnection(): IConnection
        isConnected(): boolean
        restartConnection(): void
    }
}
