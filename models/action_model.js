import { Model, DataTypes } from "sequelize";

class Action extends Model {
    static init(sequelize) {
        return super.init({
            goal_form: DataTypes.INTEGER,
            employee_id: DataTypes.INTEGER,
            description: DataTypes.TEXT,
            status: DataTypes.BOOLEAN
        }, { sequelize, modelName: 'actions' })
    }
}

export default Action
