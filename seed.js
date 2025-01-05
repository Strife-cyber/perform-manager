import { faker } from "@faker-js/faker";
import fs from "fs/promises"; // Use fs.promises for writing JSON files
import bcrypt from 'bcrypt';
import sequelize from "./config/database.js";
import models from "./models/index.js";

(async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });

    const users = [];
    const userCredentials = []; // Array to store email and password for the JSON file

    // Create Users (50)
    for (let i = 0; i < 51; i++) {
      const email = faker.internet.email();
      const password = faker.internet.password();
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save email and password in the JSON object
      userCredentials.push({ email, password });

      // Create user in the database
      const user = await models.User.create({
        name: faker.person.fullName(),
        email,
        password: hashedPassword,
        logged: faker.datatype.boolean(),
      });

      users.push(user);
    }

    // Write user credentials to a JSON file before proceeding
    await fs.writeFile("user_credentials.json", JSON.stringify(userCredentials, null, 2), "utf-8");

    const controllers = [];
    let userIndex = 0; // Separate index for controllers

    // Create Controllers (10)
    for (let i = 0; i < 10; i++) {
      const controller = await models.Controller.create({
        user_id: users[userIndex].id, // Assign a unique user for each controller
        department: faker.commerce.department(),
      });
      controllers.push(controller);
      userIndex++; // Increment user index only for controllers
    }

    const employees = [];
    let employeeUserIndex = userIndex; // Start employee index after controllers

    // Create Employees (40 - Each Controller has 4 Employees)
    for (const controller of controllers) {
      for (let i = 0; i < 4; i++) {
        const employee = await models.Employee.create({
          user_id: users[employeeUserIndex].id, // Assign a unique user for each employee
          controller_id: controller.user_id,
          department: controller.department,
        });
        employees.push(employee);
        employeeUserIndex++;
      }
    }

    // Create a single admin
    const admin = await models.Admin.create({
      user_id: users[51].id,
      privileges: "CRUD"
    })

    // Create Performance Forms (40)
    // Each Controller assigns 1 form to each of their 4 employees
    for (const controller of controllers) {
      const controllerEmployees = employees.filter(
        (e) => e.controller_id === controller.user_id
      ); // Filter employees by controller

      for (const employee of controllerEmployees) {
        await models.Performance.create({
          title: faker.lorem.words(5),
          description: faker.lorem.sentences(2),
          path: faker.system.filePath(),
          created_by: controller.user_id, // Use the controller's associated user_id
          assigned_to: employee.user_id, // Assign the form to the employee's user_id
          due_date: faker.date.soon(30),
        });
      }
    }

    console.log("Fake data successfully created! User credentials saved to user_credentials.json.");
    process.exit();
  } catch (error) {
    console.error("Error creating fake data:", error);
    process.exit(1);
  }
})();
