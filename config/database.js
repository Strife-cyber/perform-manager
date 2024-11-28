import { Sequelize } from "sequelize"

const sequelize = new Sequelize('perform', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
})

export default sequelize;