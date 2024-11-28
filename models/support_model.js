import { Model, DataTypes } from "sequelize";

class Support extends Model {
    static init(sequelize) {
        return super.init({
            title: DataTypes.TEXT,
            description: DataTypes.TEXT,
            path: DataTypes.TEXT,
            uploaded_by: DataTypes.INTEGER
        }, { sequelize, modelName: 'supports' })
    }
}

export default Support;
