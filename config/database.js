import { Sequelize } from "sequelize"

/*const sequelize = new Sequelize('perform', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
})*/ // Uncomment this to use posgresql

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './perform.sqlite',
    logging: false
}); // comment this if you are using posgresql


export default sequelize;