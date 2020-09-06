import User from '../Models/User'

declare global
{
    export namespace NodeJS
    {
        export interface Global
        {
            User: User
        }
    }
}
