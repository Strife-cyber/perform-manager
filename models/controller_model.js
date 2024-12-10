import { Model, DataTypes } from "sequelize";

class Controller extends Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            department: DataTypes.TEXT
        }, { sequelize, modelName: 'controllers' })
    }
}

export default Controller
