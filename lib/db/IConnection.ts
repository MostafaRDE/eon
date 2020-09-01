export default interface IConnection
{
    clearConnection(): void

    connect(): boolean

    disconnect(): boolean

    getConnection(): this

    isConnected(): boolean

    restartConnection(): void
}
