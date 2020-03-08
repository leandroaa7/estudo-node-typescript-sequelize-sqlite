import { Model, DataTypes } from "sequelize";
import { database } from "../database/index";

export class Usuario extends Model {
    public id!: number;
    public email!: string;

    public password_hash!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

}

//define as propriedades que devem ser recebidas pelo usuario(via POST)
export interface UsuarioInterface {
    email: string;
    password_hash: string;
}

export const usuarioSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },

}

//representação da tabela no banco
Usuario.init( usuarioSchema, {
    tableName: "usuario",
    sequelize: database // this bit is important
}
);


Usuario.sync({ force: true }).then(() =>
    //console.log("Link table created")
    true
);
