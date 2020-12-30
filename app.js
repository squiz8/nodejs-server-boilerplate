const express = require("express");

const app = express();
const routes = require("./routes");

const UserService = require("./services/UserService");
const TodoService = require("./services/TodoService");

module.exports = (config) => {
  const log = config.log();

  const userService = new UserService();
  const todoService = new TodoService();
  // Add a request logging middleware in development mode
  if (app.get("env") === "development") {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  app.use("/", routes({ userService, todoService }));
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return app;
};
