/**
 * @function
 * @description Deep clone a class instance.
 * @param {object} instance The class instance you want to clone.
 * @returns {object} A new cloned instance.
 */
export function clone<T>(instance: T): (T | any[])
{
    if (Array.isArray(instance))
    {
        return instance.map(item => clone(item))
    }
    else if (typeof instance === 'object')
    {
        if (instance)
        {
            let temp: any
            // @ts-ignore
            if (instance.constructor)
            {
                temp = Object.assign(
                    Object.create(
                        // Set the prototype of the new object to the prototype of the instance.
                        // Used to allow new object behave like class instance.
                        Object.getPrototypeOf(instance),
                    ),
                    // Prevent shallow copies of nested structures like arrays, etc
                    JSON.parse(JSON.stringify(instance)),
                )
            }
            else
            {
                temp = JSON.parse(JSON.stringify(instance))
            }

            Object.keys(instance).forEach(item =>
            {
                // @ts-ignore
                temp[item] = clone(instance[ item ])
            })

            Object.getOwnPropertySymbols(instance).forEach(symbol =>
            {
                // @ts-ignore
                temp[symbol] = instance[symbol]
            })

            return temp
        }
        else
        {
            return instance
        }
    }
    else
    {
        return instance
    }
}

export function hasOwnProperty(object: Record<string, unknown>, key: string)
{
    return Object.prototype.hasOwnProperty.call(object, key)
}
