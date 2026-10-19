const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    assignedTo: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, default: "Pending" }
  },
  { timestamps: true, versionKey: false }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
