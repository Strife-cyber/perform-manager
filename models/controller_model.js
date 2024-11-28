import { Model, DataTypes } from "sequelize";

class Controller extends Model {
    static init(sequelize) {
        return super.init({
            user_id: DataTypes.INTEGER,
            department: DataTypes.TEXT
        }, { sequelize, modelName: 'controllers' })
    }
}

export default Controller
