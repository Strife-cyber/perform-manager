import { Model, DataTypes } from "sequelize";

class Goal extends Model {
    static init(sequelize){
        return super.init({
            employee_id: DataTypes.INTEGER,
            title: DataTypes.TEXT,
            description: DataTypes.TEXT,
            path: DataTypes.TEXT,
            created_by: DataTypes.INTEGER
        }, { sequelize, modelName: 'goals' })
    }
}

export default Goal
