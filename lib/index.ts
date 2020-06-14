import * as DB from './db/DB'
import Drivers from "./modules/enums/Drivers";

let a = new DB.DB.DB({
    database: "ejareyi", driver: Drivers.postgres, host: "127.0.0.1", password: "root", port: undefined, username: "postgres"
})

// console.log(a.co)
