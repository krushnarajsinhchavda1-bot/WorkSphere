import axios from "axios";

const API_URL = "http://localhost:7000/api";

// Projects
export const getProjects = () => axios.get(`${API_URL}/projects`);
export const createProject = (data) => axios.post(`${API_URL}/projects`, data);
export const updateProject = (id, data) => axios.patch(`${API_URL}/projects/${id}`, data);
export const deleteProject = (id) => axios.delete(`${API_URL}/projects/${id}`);

// Tasks
export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const createTask = (data) => axios.post(`${API_URL}/tasks`, data);
export const updateTask = (id, data) => axios.patch(`${API_URL}/tasks/${id}`, data);
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`);
