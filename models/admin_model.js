import { Model, DataTypes } from "sequelize";

class Admin extends Model {
    static init (sequelize) {
        return super.init({
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            privileges: {
                type: DataTypes.TEXT,
                defaultValue: "CRUD"
            }
        }, { sequelize, modelName: 'admins' })
    }
}

export default Admin;
