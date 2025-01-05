import sequelize from '../config/database.js';

import Action from './action_model.js';
import Admin from './admin_model.js';
import Controller from './controller_model.js';
import Employee from './employee_model.js';
import Goal from './goal_model.js';
import Notification from './notification_model.js';
import Performance from './performance_model.js';
import Rating from './rating_model.js';
import Support from './support_model.js';
import User from './user_model.js';

// Initialize the models
const models = {
    Action: Action.init(sequelize),
    Admin: Admin.init(sequelize),
    Controller: Controller.init(sequelize),
    Employee: Employee.init(sequelize),
    Goal: Goal.init(sequelize),
    Notification: Notification.init(sequelize),
    Performance: Performance.init(sequelize),
    Rating: Rating.init(sequelize),
    Support: Support.init(sequelize),
    User: User.init(sequelize),
};

// Define associations between the models

// Associations with the user model
models.User.hasMany(models.Employee, { foreignKey: 'user_id' });
models.User.hasMany(models.Admin, { foreignKey: 'user_id' });
models.User.hasMany(models.Controller, { foreignKey: 'user_id' });
models.User.hasMany(models.Notification, { foreignKey: 'user_id' });

// Reverse `belongsTo` for User associations
models.Employee.belongsTo(models.User, { foreignKey: 'user_id' });
models.Admin.belongsTo(models.User, { foreignKey: 'user_id' });
models.Controller.belongsTo(models.User, { foreignKey: 'user_id' });
models.Notification.belongsTo(models.User, { foreignKey: 'user_id' });

// Associations with the controller model
models.Controller.hasMany(models.Employee, { foreignKey: 'controller_id' });
models.Controller.hasMany(models.Performance, { foreignKey: 'created_by' });
models.Controller.hasMany(models.Goal, { foreignKey: 'created_by' });
models.Controller.hasMany(models.Support, { foreignKey: 'uploaded_by' });

// Reverse `belongsTo` for Controller associations
models.Employee.belongsTo(models.Controller, { foreignKey: 'controller_id' });
models.Performance.belongsTo(models.Controller, { foreignKey: 'created_by' });
models.Goal.belongsTo(models.Controller, { foreignKey: 'created_by' });
models.Support.belongsTo(models.Controller, { foreignKey: 'uploaded_by' });

// Associations with the employee model
models.Employee.hasMany(models.Performance, { foreignKey: 'assigned_to' });
models.Employee.hasMany(models.Goal, { foreignKey: 'employee_id' });
models.Employee.hasMany(models.Action, { foreignKey: 'employee_id' });
models.Employee.hasMany(models.Rating, { foreignKey: 'employee_id' });

// Reverse `belongsTo` for Employee associations
models.Performance.belongsTo(models.Employee, { foreignKey: 'assigned_to' });
models.Goal.belongsTo(models.Employee, { foreignKey: 'employee_id' });
models.Action.belongsTo(models.Employee, { foreignKey: 'employee_id' });
models.Rating.belongsTo(models.Employee, { foreignKey: 'employee_id' });

// Association with the performance model
models.Performance.hasMany(models.Rating, { foreignKey: 'performance_form' });

// Reverse `belongsTo` for Performance associations
models.Rating.belongsTo(models.Performance, { foreignKey: 'performance_form' });

// Association with the goal model
models.Goal.hasOne(models.Action, { foreignKey: 'goal_form' });

// Reverse `belongsTo` for Goal association
models.Action.belongsTo(models.Goal, { foreignKey: 'goal_form' });

// Set up additional associations if defined in the models
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Sync models with the database
sequelize
    .sync({ alter: false }) // possibly switch to true
    .then(() => console.log('Database && tables created!'))
    .catch((error) => console.error('Database sync failed: ', error));

export { sequelize };
export default models;
