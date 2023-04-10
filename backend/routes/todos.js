const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting todos" });
  }
});

// GET a single todo by ID
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting todo" });
  }
});

// CREATE a new todo
router.post("/", async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      completed: false,
      user: req.user == null ? 0 : req.user.id,
    });
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating todo" });
  }
});

// UPDATE an existing todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (todo) {
      todo.title = req.body.title || todo.title;
      todo.description = req.body.description || todo.description;
      todo.completed = req.body.completed || todo.completed;
      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating todo" });
  }
});

// DELETE an existing todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (todo) {
      await todo.delete();
      res.json({ message: "Todo deleted" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting todo" });
  }
});

module.exports = router;
