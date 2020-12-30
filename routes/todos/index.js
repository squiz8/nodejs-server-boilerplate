const express = require("express");

const router = express.Router();

module.exports = (todoService) => {
  router.get("/", async (req, res) => {
    try {
      const todo = await todoService.getTodos();
      res.send(todo);
    } catch (error) {
      return next(error);
    }
  });

  return router;
};
