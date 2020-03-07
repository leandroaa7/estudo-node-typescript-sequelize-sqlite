import path from 'path';
const sqlite = require('sqlite3');

let dbName: string;
let env: string | undefined = process.env.NODE_ENV
let storage: string;

if (env === "production") {
    dbName = "database_production";
    storage = path.resolve(__dirname, "../../storage/database_production.sqlite")
} else if (env === "development") {
    dbName = "database_development";
    storage = path.resolve(__dirname, "../../storage/database_development.sqlite")
} else {
    dbName = "database_test";
    storage = ':memory:';
}

let config = {}

config = {
    dialect: 'sqlite',
    dialectModule: sqlite,
    storage: storage,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: dbName,

    //desabilitar logs
    loggin: true,
    define: {
        //desativar o nome das tabelas criadas no plural
        freezeTableName: true,

        //faz com que toda tabela possua os campos created_at e updated_at
        timestamps: true,
        // faz com que as tabelas estejam no formato undeline, exemplo a tabela UserGroups se torna user_group
        underscored: true,
        // faz com que a regra como a de cima seja feita, também, nos campos da tabela
        underscoredAll: true

    }
}
export default config;