/**
 * @function
 * @description Deep clone a class instance.
 * @param {object} instance The class instance you want to clone.
 * @param {number} deep The deep of function
 * @returns {object} A new cloned instance.
 */
export function clone<T>(instance: T, deep = 1): (T | any[])
{
    if (deep < 0)
        return instance

    try
    {
        if (Array.isArray(instance))
        {
            return instance.map(item => clone(item, deep - 1))
        }
        else if (typeof instance === 'object')
        {
            if (instance)
            {
                let temp: any
                // @ts-ignore
                if (instance.constructor)
                {
                    try
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
                    catch (e)
                    {
                        temp = Object.assign(
                            Object.create(
                                // Set the prototype of the new object to the prototype of the instance.
                                // Used to allow new object behave like class instance.
                                Object.getPrototypeOf(instance),
                            ),
                            // Prevent shallow copies of nested structures like arrays, etc
                            instance,
                        )
                    }
                }
                else
                {
                    temp = JSON.parse(JSON.stringify(instance))
                }

                Object.keys(instance).forEach(item =>
                {
                    // @ts-ignore
                    temp[ item ] = clone(instance[ item ], deep - 1)
                })

                Object.getOwnPropertySymbols(instance).forEach(symbol =>
                {
                    // @ts-ignore
                    temp[ symbol ] = instance[ symbol ]
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
    catch (e)
    {
        // console.error(e)
        return instance
    }
}

export function hasOwnProperty(object: Record<string, unknown>, key: string): boolean
{
    return Object.prototype.hasOwnProperty.call(object, key)
}

export function changeStringCase(text: string, type: string): string
{
    switch (type)
    {
        case 'camel':
            return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())

        case 'kebab':
        case 'snake':
        {
            const temp = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            if (temp)
            {
                if (type === 'kebab')
                    return temp.map(x => x.toLowerCase()).join('-')
                else
                    return temp.map(x => x.toLowerCase()).join('_')
            }
            else
            {
                return ''
            }
        }

        case 'pascal':
            return text.replace(/\w\S*/g, m => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase())

        default:
            return ''
    }
}
