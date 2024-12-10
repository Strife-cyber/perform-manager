import { Model, DataTypes } from "sequelize";

class Employee extends Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            controller_id: DataTypes.INTEGER,
            department: DataTypes.TEXT
        }, { sequelize, modelName: 'employees' })
    }
}

export default Employee
