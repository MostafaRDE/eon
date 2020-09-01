/*
|--------------------------------------------------------------------------
| Load helpers
|--------------------------------------------------------------------------
|
| In this file, we load all helpers files and save a global variable with
| *helpers* name.
|
*/

// @ts-ignore
const { readdirSync } = require('fs')

readdirSync('./lib/helpers').forEach((file: any) =>
{
    if (/\.ts$/.test(file))
    {
        const filename = file.replace(/\.ts$/, '')
        const functions = require(`./helpers/${ filename }`)
        Object.keys(functions).forEach(key =>
        {
            // @ts-ignore
            global[ key ] = functions[ key ]
        })
    }
})
