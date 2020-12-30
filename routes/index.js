const express = require("express");

const router = express.Router();

const todoRoute = require("./todos");
const userRoute = require("./users");

module.exports = (params) => {
  router.get("/", (req, res) => {
    res.send("HOME PAGE");
  });

  router.use("/todo", todoRoute(params.todoService));
  router.use("/profile", userRoute(params.userService));

  return router;
};
