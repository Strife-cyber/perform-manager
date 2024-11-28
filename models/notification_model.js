import { Model, DataTypes } from "sequelize";

class Notification extends Model {
    static init(sequelize) {
        return super.init({
            user_id: DataTypes.INTEGER,
            message: DataTypes.TEXT,
            status: DataTypes.BOOLEAN
        }, { sequelize, modelName: 'notifications' })
    }
}

export default Notification
