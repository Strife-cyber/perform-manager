import { Model, DataTypes } from "sequelize";

class Rating extends Model {
    static init(sequelize) {
        return super.init({
            performance_form: DataTypes.INTEGER,
            employee_id: DataTypes.INTEGER,
            rating: DataTypes.INTEGER,
            comments: DataTypes.TEXT
        }, { sequelize, modelName: 'ratings' })
    }
}

export default Rating
