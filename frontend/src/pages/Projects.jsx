import { useState, useEffect } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "../services/api";

const emptyForm = { name: "", team: "", deadline: "", status: "Pending" };

function Projects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  async function loadProjects() {
    const response = await getProjects();
    setProjects(response.data);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editId) {
        await updateProject(editId, formData);
        setMessage("Project updated");
      } else {
        await createProject(formData);
        setMessage("Project added");
      }
      setFormData(emptyForm);
      setEditId(null);
      loadProjects();
    } catch (error) {
      setMessage("Unable to save project");
    }
  }

  function handleEdit(project) {
    setEditId(project._id);
    setFormData({
      name: project.name,
      team: project.team,
      deadline: project.deadline.slice(0, 10),
      status: project.status,
    });
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this project?")) {
      await deleteProject(id);
      setMessage("Project deleted");
      loadProjects();
    }
  }

  return (
    <div>
      <h2>{editId ? "Edit Project" : "Add Project"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
        <input name="team" placeholder="Team Members (Amit, Riya)" value={formData.team} onChange={handleChange} required />
        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button type="submit">{editId ? "Update Project" : "Add Project"}</button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setFormData(emptyForm); }}>
            Cancel
          </button>
        )}
      </form>

      {message && <p className="message">{message}</p>}

      <h2>All Projects</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.name}</td>
              <td>{project.team}</td>
              <td>{project.deadline.slice(0, 10)}</td>
              <td>{project.status}</td>
              <td>
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Projects;
