import { Model, DataTypes } from "sequelize";

class Admin extends Model {
    static init (sequelize) {
        return super.init({
            user_id: DataTypes.INTEGER,
            privileges: DataTypes.TEXT
        }, { sequelize, modelName: 'admins' })
    }
}

export default Admin;
