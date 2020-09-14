import User, { instance } from './User'


// Test Static Functions

User.insert({
    name: 'Mostafa',
}).then(console.log)

User.insert({
    name: 'Mobina',
}).then(console.log)


// Test Instance of Model

instance.name = 'MostafaRDE'

console.log(instance.data)