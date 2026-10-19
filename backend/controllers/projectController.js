const Project = require("../models/Project");

const getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
};

const createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
};

const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
};

const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted successfully" });
};

module.exports = {
  getProjects, getProjectById, createProject, updateProject, deleteProject
};
