const express = require("express");
const { findAllJobs,
        jobById,
        createJob,
        updateJob,
        deleteJob,
        getTasks,
        createTaskByJobId,
        updateTaskById,
        deleteTask
    } = require('../controllers/job')
const Auth = require("../middleware/Auth");

const JobRoute = express.Router();

// find all jobs
JobRoute.get("/", Auth, findAllJobs)
// create job
JobRoute.post("/", Auth, createJob);
// find one job
JobRoute.get("/:id", Auth, jobById);
// delete user post
JobRoute.delete("/:id", Auth, deleteJob);
// update user post
JobRoute.put("/edit/:id", Auth, updateJob);
// Get tasks related to Job by ID
JobRoute.get("/:id/tasks", Auth, getTasks)
// Create task inside a job, found by ID
JobRoute.post("/:id/task", Auth, createTaskByJobId)
// Updating a task inside of a job
JobRoute.put("/task/:id", Auth, updateTaskById)
// Deleting a Task inside a Job
JobRoute.delete("/task/:id", Auth, deleteTask)


module.exports = JobRoute;
