import { Model, DataTypes } from "sequelize";

class Admin extends Model {
    static init (sequelize) {
        return super.init({
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            privileges: DataTypes.TEXT
        }, { sequelize, modelName: 'admins' })
    }
}

export default Admin;
