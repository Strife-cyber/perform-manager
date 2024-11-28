import { Model, DataTypes } from "sequelize";

class Performance extends Model {
    static init(sequelize) {
        return super.init({
            title: DataTypes.TEXT,
            description: DataTypes.TEXT,
            path: DataTypes.TEXT,
            created_by: DataTypes.INTEGER,
            assigned_to: DataTypes.INTEGER,
            due_date: DataTypes.DATE
        }, { sequelize, modelName: 'performances' })
    }
}

export default Performance
