const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Job = require('../models/job');
const Comment = require("../models/comment");
const Post = require("../models/post");

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
        const getJobs = await Job.find({})
        .then(jobs => {
            console.log('All jobs', jobs);
            res.json({ jobs: jobs });
        })
        return res.status(200).json(getJobs);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

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
        const getOneJob = await Job.findById(req.params.id)
        return res.status(200).json(getOneJob);
    } catch (error) {
        return res.status(500).json({ message: error.message }); 
    }
}

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
    })
        return res.status(200).json(newJob);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

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
        const getJob = await Job.findById(req.params.id)
        if (!getJob)
        return res.status(400).json({ message: "something went wrong !!" });
        const newJob = await Job.findByIdAndUpdate(req.params.id, { 
                    title: req.body.title ? req.body.title : foundJob.title,
                    url: req.body.url ? req.body.url : foundJob.url,
                    description: req.body.description ? req.body.description : foundJob.description,
                    status: req.body.status ? req.body.status : foundJob.status,
                    contactEmail: req.body.contactEmail ? req.body.contactEmail : foundJob.contactEmail,
                    contactName: req.body.contactName ? req.body.contactName : foundJob.contactName,
            }, { 
                upsert: true 
            });
            if (!newJob)
            return res.status(500).json({ message: "something went wrong !!" });
            return res
              .status(200)
              .json({ data: newJob, message: "updated successfully " });
    } catch (error) {
        return res.status(500).json({ message: "somthing went wrong !!" });
    }
}


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
        const { jobid } = req.params;
        if (!jobid) return res.status(404).json({ message: "job not found !!" });
        await Job.findByIdAndRemove(req.params.id)
        return res.status(200).json({ message: "Job Deleted successfully" });
    } catch (error) {
    return res.status(500).json({ message: "something went wrong !!" });
    }
}


// =============== BELOW RELATED TO COMMENTS ======================

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
// })

// // GET a Jobs tasks
// router.get('/:id/tasks', (req, res) => {
//     Job.findById(req.params.id).populate('tasks').exec()
//     .then(task => {
//         console.log('Hey this is the task', task);
//         res.json({task: task })
//     })
// })

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

module.exports = {
    findAllJobs,
    jobById,
    createJob,
    updateJob,
    deleteJob
};