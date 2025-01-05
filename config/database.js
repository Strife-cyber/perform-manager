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
}); // comment this if you are using posgresql to use this also install sqlite3


export default sequelize;
