const Task = require("../models/Task");

const getTasks = async (req, res) => {
  const tasks = await Task.find().populate("project", "name");
  res.json(tasks);
};

const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id).populate("project", "name");
  res.json(task);
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted successfully" });
};

module.exports = {
  getTasks, getTaskById, createTask, updateTask, deleteTask
};
