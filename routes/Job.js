const express = require("express");
const {
  findAllJobs,
  jobById,
  createJob,
  updateJob,
  deleteJob,
  getTasks,
  createTaskByJobId,
  updateTaskById,
  deleteTask,
} = require("../controllers/job");
const {
  getItemsByTask,
  createItemByTask,
  updateItemByTask,
  deleteItemByTask,
} = require("../controllers/item");
const Auth = require("../middleware/Auth");

const JobRoute = express.Router();

// find all jobs
JobRoute.get("/", Auth, findAllJobs);
// create job
JobRoute.post("/", Auth, createJob);
// find one job
JobRoute.get("/:id", Auth, jobById);
// update user post
JobRoute.put("/:id", Auth, updateJob);
// delete user post
JobRoute.delete("/:id", Auth, deleteJob);
// Get tasks related to Job by ID
JobRoute.get("/:id/task", Auth, getTasks);
// Create task inside a job, found by ID
JobRoute.post("/:id/task", Auth, createTaskByJobId);
// Updating a task inside of a job
JobRoute.put("/:id/task/:taskId", Auth, updateTaskById);
// Deleting a Task inside a Job
JobRoute.delete("/:id/task/:taskId", Auth, deleteTask);
// Get tasks related to Job by ID
JobRoute.get("/:id/task/:taskId/item", Auth, getItemsByTask);
// Create task inside a job, found by ID
JobRoute.post("/:id/task/:taskId/item", Auth, createItemByTask);
// Updating a task inside of a job
JobRoute.put("/:id/task/:taskId/item/:itemId", Auth, updateItemByTask);
// Deleting a Task inside a Job
JobRoute.delete("/:id/task/:taskId/item/:itemId", Auth, deleteItemByTask);

module.exports = JobRoute;
