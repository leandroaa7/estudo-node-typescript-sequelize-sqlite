const path = require('path')
const sqlite = require('sqlite3');
const fs = require('fs');
const dotenv = require('dotenv');
let dbName, storage, env = process.env.NODE_ENV, config = {};

dotenv.config(
    { path: path.resolve(__dirname, "../env/.env") }
)

if (env === "production") {
    dbName = "database_production";
    storage = path.resolve(__dirname, "../../storage/database_production.sqlite")
} else {
    dbName = "database_development";
    storage = path.resolve(__dirname, "../../storage/database_development.sqlite")
}

config = {
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: storage,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: null,
    database: dbName,

    //desabilitar logs
    logging: false,
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
};

fs.writeFileSync(path.resolve(__dirname, "./config.json"), JSON.stringify(config), 'utf-8');

config.dialectModule = sqlite;

module.exports.development = config
module.exports.production = config
module.exports.test = config