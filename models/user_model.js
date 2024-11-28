import { Model, DataTypes } from "sequelize";

class User extends Model {
    static init(sequelize) {
        return super.init({
            name: DataTypes.TEXT,
            email: DataTypes.TEXT,
            password: DataTypes.TEXT,
            logged: DataTypes.BOOLEAN
        }, { sequelize, modelName: 'users' })
    }
}

export default User
