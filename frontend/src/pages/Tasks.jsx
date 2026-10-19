import { useState, useEffect } from "react";
import { getProjects, getTasks, createTask, updateTask, deleteTask } from "../services/api";

const emptyForm = { title: "", project: "", assignedTo: "", deadline: "", status: "Pending" };

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  async function loadData() {
    const taskRes = await getTasks();
    const projectRes = await getProjects();
    setTasks(taskRes.data);
    setProjects(projectRes.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editId) {
        await updateTask(editId, formData);
        setMessage("Task updated");
      } else {
        await createTask(formData);
        setMessage("Task added");
      }
      setFormData(emptyForm);
      setEditId(null);
      loadData();
    } catch (error) {
      setMessage("Unable to save task");
    }
  }

  function handleEdit(task) {
    setEditId(task._id);
    setFormData({
      title: task.title,
      project: task.project ? task.project._id : "",
      assignedTo: task.assignedTo,
      deadline: task.deadline.slice(0, 10),
      status: task.status,
    });
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this task?")) {
      await deleteTask(id);
      setMessage("Task deleted");
      loadData();
    }
  }

  return (
    <div>
      <h2>{editId ? "Edit Task" : "Add Task"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Task Title" value={formData.title} onChange={handleChange} required />
        <select name="project" value={formData.project} onChange={handleChange} required>
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
        <input name="assignedTo" placeholder="Assigned To" value={formData.assignedTo} onChange={handleChange} required />
        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button type="submit">{editId ? "Update Task" : "Add Task"}</button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setFormData(emptyForm); }}>
            Cancel
          </button>
        )}
      </form>

      {message && <p className="message">{message}</p>}

      <h2>All Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Project</th>
            <th>Assigned To</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.project ? task.project.name : "-"}</td>
              <td>{task.assignedTo}</td>
              <td>{task.deadline.slice(0, 10)}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;
