import express from 'express'
import * as UserController from './controllers/user_controller.js'
import * as ControllerController from './controllers/cont_controller.js';
import * as EmployeeController from './controllers/employee_controller.js';
import * as PerformanceController from './controllers/performance_controller.js';
import * as RatingController from './controllers/rating_controller.js';
import * as SupportController from './controllers/support_controller.js';
import * as ActionController from './controllers/action_controller.js';
import * as GoalController from './controllers/goal_controller.js';
import * as AdminController from './controllers/admin_controller.js';
import * as NotificationController from './controllers/notification_controller.js';

const routes = express.Router();

// User routes
// General routes
routes.get('/users', UserController.getAllUsers)
routes.put('/users', UserController.updateUser)
routes.delete('/users', UserController.deleteUser)

// Specific routes
routes.post('/users/register', UserController.register)
routes.post('/users/login', UserController.login)

routes.get('/users/logout', UserController.logout)
routes.get('/users/status', UserController.authenticated)
routes.get('/users/profile', UserController.profile)



// Controller routes
//General routes
routes.get('/controllers', ControllerController.getAllControllers);
routes.get('/controller', ControllerController.getController);
routes.post('/controllers', ControllerController.createController);
routes.put('/controllers', ControllerController.updateController);
routes.delete('/controllers', ControllerController.deleteController);

// Relationship routes
routes.get('/controllers/employees', ControllerController.getControllerEmployees);
routes.get('/controllers/performances', ControllerController.getControllerPerformances);
routes.get('/controllers/goals', ControllerController.getControllerGoals);
routes.get('/controllers/supports', ControllerController.getControllerSupports);


// Employee Routes
// Employee CRUD routes
routes.get('/employees',EmployeeController.getAllEmployees);           // Get all employees
routes.get('/employee', EmployeeController.getEmployee);           // Get a single employee by ID
routes.post('/employees', EmployeeController.createEmployee);           // Create a new employee
routes.put('/employees', EmployeeController.updateEmployee);        // Update an employee by ID
routes.delete('/employees', EmployeeController.deleteEmployee);     // Delete an employee by ID

// Routes for fetching related data
routes.get('/employees/performances', EmployeeController.getEmployeePerformances); // Get performances for an employee
routes.get('/employees/goals', EmployeeController.getEmployeeGoals);               // Get goals for an employee
routes.get('/employees/actions', EmployeeController.getEmployeeActions);           // Get actions for an employee
routes.get('/employees/ratings', EmployeeController.getEmployeeRatings);           // Get ratings for an employee


// Performance Routes
// Performance CRUD routes
routes.get('/performances', PerformanceController.getAllPerformances);          // Get all performances
routes.get('/performance', PerformanceController.getPerformance);          // Get a single performance by ID
routes.post('/performances', PerformanceController.createPerformance);          // Create a new performance
routes.put('/performances', PerformanceController.updatePerformance);       // Update a performance by ID
routes.delete('/performances', PerformanceController.deletePerformance);    // Delete a performance by ID

// Routes for fetching related data
routes.get('/performances/ratings', PerformanceController.getPerformanceRatings);   // Get ratings for a performance
routes.get('/performances/employee', PerformanceController.getPerformanceEmployee); // Get employee assigned to performance
routes.get('/performances/controller', PerformanceController.getPerformanceController); // Get controller who created the performance


// Rating Routes
// Rating CRUD routes
routes.get('/ratings', RatingController.getAllRatings);
routes.get('/rating', RatingController.getRating);
routes.post('/ratings', RatingController.createRating);
routes.put('/ratings', RatingController.updateRating);
routes.delete('/ratings', RatingController.deleteRating);

// Routes for fetching related data
routes.get('/ratings/employee', RatingController.getRatingEmployee);
routes.get('/ratings/performance', RatingController.getRatingPerformance);


// Support Routes
// Support CRUD routes
routes.get('/supports', SupportController.getAllSupports);
routes.get('/support', SupportController.getSupport);
routes.post('/supports', SupportController.createSupport);
routes.put('/supports', SupportController.updateSupport);
routes.delete('/supports', SupportController.deleteSupport);

// Routes for fetching related data
routes.get('/supports/uploader', SupportController.getSupportUploader)


// Action Routes
// Action CRUB routes
routes.get('/actions', ActionController.getAllActions);
routes.get('/action', ActionController.getAction);
routes.post('/actions', ActionController.createAction);
routes.put('/actions', ActionController.updateAction);
routes.delete('/actions', ActionController.deleteAction);

// Routes for fetching related data
routes.get('/actions/employee', ActionController.getActionEmployee);
routes.get('/actions/goal', ActionController.getActionGoal);


// Goal Routes
// Goal CRUD routes
routes.get('/goals', GoalController.getAllGoals);
routes.get('/goal', GoalController.getGoal);
routes.post('/goals', GoalController.createGoal);
routes.put('/goals', GoalController.updateGoal);
routes.delete('/goals', GoalController.deleteGoal);

// Routes for fetching related data
routes.get('/goals/action', GoalController.getGoalAction);
routes.get('/goals/employee', GoalController.getGoalEmployee);
routes.get('/goals/controller', GoalController.getGoalController);


// Admin Routes
// Admin CRUD routes
routes.get('/admins', AdminController.getAllAdmins);
routes.get('/admin', AdminController.getAdmin);
routes.post('/admins', AdminController.createAdmin);
routes.put('/admins', AdminController.updateAdmin);
routes.delete('/admins', AdminController.deleteAdmin);

// Routes for fetching related data
routes.get('/admins/user', AdminController.getAdminUser);


// Notification Routes
routes.get('/notifications', NotificationController.getNotificationsByUser);
routes.post('/notifications', NotificationController.createNotification);
routes.put('/notifications', NotificationController.markAsRead);
routes.get('/notifications/unread', NotificationController.getUnreadNotifications);
routes.get('/notifications/read', NotificationController.getReadNotifications);

export default routes;
