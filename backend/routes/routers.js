const express = require("express");
const {
  getProjects, getProjectById, createProject, updateProject, deleteProject
} = require("../controllers/projectController");
const {
  getTasks, getTaskById, createTask, updateTask, deleteTask
} = require("../controllers/taskController");

const router = express.Router();

router.route("/projects").get(getProjects).post(createProject);
router.route("/projects/:id").get(getProjectById).patch(updateProject).delete(deleteProject);

router.route("/tasks").get(getTasks).post(createTask);
router.route("/tasks/:id").get(getTaskById).patch(updateTask).delete(deleteTask);

module.exports = router;
