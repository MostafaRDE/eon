function getPropertyFromGetterSetter(property: any)
{
    const sliced = property.slice(3)
    const firstLetter = sliced[ 0 ].toLowerCase()
    const rest = sliced.slice(1)

    return firstLetter + rest
}

const withGettersSetters = {
    get(object: any, property: any)
    {
        // "getConstructionYear"
        if (property.startsWith('get'))
        {
            // motorcycle.getConstructionYear()
            return () => object[ getPropertyFromGetterSetter(property) ]
        }

        if (property.startsWith('set'))
        {
            // motorcycle.setConstructionYear(2021)
            return (newValue: any) =>
            {
                object[ getPropertyFromGetterSetter(property) ] = newValue
            }
        }

        // motorcycle.constructionYear
        return object[ property ]
    },
}

export default class GettersSetters
{
    constructor()
    {
        return new Proxy(this, withGettersSetters)
    }
}
