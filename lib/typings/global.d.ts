export {}

declare global
{
    export namespace NodeJS
    {
        export interface Global
        {
            clone<T>(instance: T, deep: number): T
            hasOwnProperty(object: Record<string, unknown>, key: string): boolean
            changeStringCase(text: string, type: string): string
        }
    }
}
