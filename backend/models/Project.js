const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    team: { type: String, required: true },   // e.g. "Amit, Riya, Karan"
    deadline: { type: Date, required: true },
    status: { type: String, default: "Pending" }
  },
  { timestamps: true, versionKey: false }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
