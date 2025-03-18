require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("../models/Todo");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post("/todos", async (req, res) => {
    const { text } = req.body;
    const newTodo = new Todo({ text });
    await newTodo.save();
    res.json(newTodo);
});

app.delete("/todos/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
