const express = require("express");
const { findAllJobs,
        jobById,
        createJob,
        updateJob,
        deleteJob 
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
JobRoute.delete("/:jobid", Auth, deleteJob);
// update user post
JobRoute.put("/edit/:id", Auth, updateJob);

module.exports = JobRoute;
