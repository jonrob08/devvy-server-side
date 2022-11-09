const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Task = require("../models/task");
const Job = require("../models/job");
const Comment = require("../models/comment");
const Post = require("../models/post");
const { findById } = require("../models/comment");

// router.get('/', (req, res) => {
//     Job.find({})
//     .then(jobs => {
//         console.log('All jobs', jobs);
//         res.json({ jobs: jobs });
//     })
//     .catch(error => {
//         console.log('error', error)
//         res.json({ message: 'Error occured, please try again' });
//     });
// });

const findAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id });
    return res.status(200).json({ jobs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// router.get('/:id', (req, res) => {
//     console.log('find job by ID', req.params.id);
//     Job.findById(req.params.id)
//     .then(job => {
//         console.log('Here is the job', job);
//         res.json({ job: job });
//     })
//     .catch(error => {
//         console.log('error', error);
//         res.json({ message: "Error ocurred, please try again" });
//     });
// });

const jobById = async (req, res) => {
  try {
    const getOneJob = await Job.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "job",
          as: "tasks",
          pipeline: [
            {
              $lookup: {
                from: "items",
                localField: "_id",
                foreignField: "task",
                as: "items",
              },
            },
          ],
        },
      },
      { $limit: 1 }
      // { $unwind:{
      //     path: "$tasks",
      //     preserveNullAndEmptyArrays: true

      // }},
      // {$lookup: {
      //     from: 'items',
      //     localField: "tasks._id",
      //     foreignField: "task",
      //     as: "tasks.items"
      // }},
    ]);
    return res.status(200).json(getOneJob[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// router.post('/', (req, res) => {
//     Job.create({
//         title: req.body.title,
//         url: req.body.url,
//         description: req.body.description,
//         status: req.body.status,
//         contactEmail: req.body.contactEmail,
//         contactName: req.body.contactName,
//     })
//     .then(job => {
//         console.log('New job =>>', job);
//         res.json({ job: job });
//     })
//     .catch(error => {
//         console.log('error', error)
//         res.json({ message: "Error ocurred, please try again" })
//     });
// });

const createJob = async (req, res) => {
  try {
    const newJob = await Job.create({
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
      status: req.body.status,
      contactEmail: req.body.contactEmail,
      contactName: req.body.contactName,
      user: req.user._id,
    });
    return res.status(200).json(newJob);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// router.put('/:id', (req, res) => {
//     console.log('route is being on PUT')
//     Job.findById(req.params.id)
//     .then(foundJob => {
//         console.log('Job found', foundJob);
//         Job.findByIdAndUpdate(req.params.id, {
//                 title: req.body.title ? req.body.title : foundJob.title,
//                 // body: req.body.body ? req.body.body : foundJob.body,
//                 url: req.body.url ? req.body.url : foundJob.url,
//                 description: req.body.description ? req.body.description : foundJob.description,
//                 status: req.body.status ? req.body.status : foundJob.status,
//                 contactEmail: req.body.contactEmail ? req.body.contactEmail : foundJob.contactEmail,
//                 contactName: req.body.contactName ? req.body.contactName : foundJob.contactName,
//         }, {
//             upsert: true
//         })
//         .then(job => {
//             console.log('job was updated', job);
//             res.redirect(`/jobs/${req.params.id}`);
//         })
//         .catch(error => {
//             console.log('error', error)
//             res.json({ message: "Error ocurred, please try again" })
//         })
//     })
//     .catch(error => {
//         console.log('error', error)
//         res.json({ message: "Error ocurred, please try again" })
//     })
// });

const updateJob = async (req, res) => {
  try {
    const getJob = await Job.findById(req.params.id);
    if (!getJob)
      return res.status(400).json({ message: "something went wrong !!" });
    const newJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title ? req.body.title : getJob.title,
        url: req.body.url ? req.body.url : getJob.url,
        description: req.body.description ? req.body.description : getJob.description,
        status: req.body.status ? req.body.status : getJob.status,
        contactEmail: req.body.contactEmail ? req.body.contactEmail : getJob.contactEmail,
        contactName: req.body.contactName ? req.body.contactName : getJob.contactName,
      },
      {
        upsert: true,
      }
    );
    if (!newJob)
      return res.status(500).json({ message: "something went wrong !!" });
    return res
      .status(200)
      .json({ data: newJob, message: "updated successfully " });
  } catch (error) {
    return res.status(500).json({ message: "somthing went wrong !!" });
  }
};

// router.delete('/:id', (req, res) => {
//     Job.findByIdAndRemove(req.params.id)
//     .then(response => {
//         console.log('This was deleted', response);
//         res.json({ message: `Job ${req.params.id} was deleted`});
//     })
//     .catch(error => {
//         console.log('error', error)
//         res.json({ message: "Error ocurred, please try again" });
//     })
// });

const deleteJob = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(404).json({ message: "job not found !!" });
    await Job.findByIdAndRemove(id);
    return res.status(200).json({ message: "Job Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong !!" });
  }
};

// =============== BELOW RELATED TO Tasks ======================

// router.get('/tasks/:id', (req, res) => {
//     Task.findById(req.params.id)
//     .then(task => {
//         console.log('Here is the task', task);
//         res.json({ task: task });
//     })
//     .catch(error => {
//         console.log('error', error);
//         res.json({ message: "Error ocurred, please try again" });
//     });
// }

// GET a Jobs tasks

const getTasks = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("tasks").exec();
    console.log("Hey this is the task", job);
    res.json({ job: job });
  } catch (error) {
    console.log(error);
  }
};

// // create a task in a job
// router.post('/:id/tasks', (req, res) => {
//     Job.findById(req.params.id)
//     .then(job => {
//         console.log('Heyyy, this is the job', job);
//         // create and pust comment inside of post
//         Task.create({
//             title: req.body.title,
//             description: req.body.description,
//             status: req.body.status,
//             dueDate: req.body.dueDate,
//             timeSpent: req.body.timeSpent,
//         })
//         .then(task => {
//             job.tasks.push(task);
//             // save the job
//             job.save();
//             res.redirect(`/jobs/${req.params.id}`);
//         })
//         .catch(error => {
//             console.log('error', error);
//             res.json({ message: "Error ocurred, please try again" });
//         });
//     })
//     .catch(error => {
//         console.log('error', error);
//         res.json({ message: "Error ocurred, please try again" });
//     });
// });

const createTaskByJobId = async (req, res) => {
  try {
    // const job = await Job.findById(req.params.id);
    let task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
      timeSpent: req.body.timeSpent,
      job: req.params.id,
    });
    return res.status(200).send(task);
    // job.tasks.push(task);
    // // save the job
    // job.save();
    // console.log("This is the job with the task>>>>>", job)
    // res.redirect(`api/v1/job/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

// // update a task inside a job
// router.put('/tasks/:id', (req, res) => {
//     console.log('route is being on PUT')
//     Task.findById(req.params.id)
//         .then(foundTask => {
//             console.log('Task found', foundTask);
//             Task.findByIdAndUpdate(req.params.id,
//                 {
//                     title: req.body.title ? req.body.title : foundTask.title,
//                     description: req.body.description ? req.body.description : foundTask.description,
//                     status: req.body.status ? req.body.status : foundTask.status,
//                     dueDate: req.body.dueDate ? req.body.dueDate : foundTask.dueDate,
//                     timeSpent: req.body.timeSpent ? req.body.timeSpent : foundTask.timeSpent,
//                 })
//                 .then(task => {
//                     console.log('task was updated', task);
//                     res.redirect(`/jobs/tasks/${req.params.id}`)
//                 })
//                 .catch(error => {
//                     console.log('error', error)
//                     res.json({ message: "Error ocurred, please try again" })
//                 })
//         })
//         .catch(error => {
//             console.log('error', error)
//             res.json({ message: "Error ocurred, please try again" })
//         })
// });
const updateTaskById = async (req, res) => {
  try {
    const task = await Item.findById(req.params.id);
    let newTask = await Task.findByIdAndUpdate(req.params.id, {
      title: req.body.title ? req.body.title : task.title,
      description: req.body.description
        ? req.body.description
        : task.description,
      status: req.body.status ? req.body.status : task.status,
      dueDate: req.body.dueDate ? req.body.dueDate : task.dueDate,
      timeSpent: req.body.timeSpent ? req.body.timeSpent : task.timeSpent,
    });
    res.json({ task: newTask });
    // res.redirect(`api/v1/job/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

// // delete a task inside a job
// router.delete('/tasks/:id', (req, res) => {
//     Task.findByIdAndRemove(req.params.id)
//         .then(response => {
//             console.log('This was delete', response);
//             res.json({ message: `${req.params.id} was deleted` });
//         })
//         .catch(error => {
//             console.log('error', error)
//             res.json({ message: "Error ocurred, please try again" });
//         })
// });

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(404).json({ message: "task not found !!" });
    await Task.findByIdAndRemove(id);
    return res.status(200).json({ message: "Task Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong !!" });
  }
};

// Item routes

module.exports = {
  findAllJobs,
  jobById,
  createJob,
  updateJob,
  deleteJob,
  getTasks,
  createTaskByJobId,
  updateTaskById,
  deleteTask,
};
