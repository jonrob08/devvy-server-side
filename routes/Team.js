const express = require("express");
const { GetTeam } = require('../controllers/Team')
const Auth = require("../middleware/Auth");

const TeamRoute = express.Router();

// find all jobs
TeamRoute.get("/", Auth, GetTeam)
// create job
// JobRoute.post("/", Auth, createJob);
// find one job
// JobRoute.get("/:id", Auth, jobById);
// delete user post
// JobRoute.delete("/:jobid", Auth, deleteJob);
// update user post
// JobRoute.put("/edit/:id", Auth, updateJob);

module.exports = TeamRoute;
