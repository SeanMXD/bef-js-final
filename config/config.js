// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "operatorsAliases": false
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "operatorsAliases": false
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "operatorsAliases": false
//   }
// }

require('dotenv').config()
module.exports = {
  development: {
    //url: process.env.DEV_DATABASE_URL,
    host: "10.0.0.84",
    username: "sean",
    password: "9300",
    database: "bulletinboard",
    dialect: 'mysql',
    define: {timestamps: false}
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    define: {timestamps: false}
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    define: {timestamps: false}
  },
}
