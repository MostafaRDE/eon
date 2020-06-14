export namespace DB
{
    export interface IConnection
    {
        clearConnection(): void
        connect(): boolean
        disconnect(): boolean
        getConnection()
        getOptions(): object
        isConnected(): boolean
        restartConnection(): void
        setOptions(options: object): void
    }
}
