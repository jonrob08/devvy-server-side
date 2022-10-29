const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Job = require('../models/job');


router.get('/', (req, res) => {
    Job.find({})
    .then(jobs => {
        console.log('All jobs', jobs);
        res.json({ jobs: jobs });
    })
    .catch(error => { 
        console.log('error', error)
        res.json({ message: 'Error occured, please try again' });
    });
});

router.get('/:id', (req, res) => {
    console.log('find job by ID', req.params.id);
    Job.findById(req.params.id)
    .then(job => {
        console.log('Here is the job', job);
        res.json({ job: job });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});


router.post('/', (req, res) => {
    Job.create({
        title: req.body.title,
        url: req.body.url,
        description: req.body.description,
        status: req.body.status,
        contactEmail: req.body.contactEmail,
        contactName: req.body.contactName,
    })
    .then(job => {
        console.log('New job =>>', job);
        res.json({ job: job });
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});

router.put('/:id', (req, res) => {
    console.log('route is being on PUT')
    Job.findById(req.params.id)
    .then(foundJob => {
        console.log('Job found', foundJob);
        Job.findByIdAndUpdate(req.params.id, { 
                title: req.body.title ? req.body.title : foundJob.title,
                // body: req.body.body ? req.body.body : foundJob.body,
                url: req.body.url ? req.body.url : foundJob.url,
                description: req.body.description ? req.body.description : foundJob.description,
                status: req.body.status ? req.body.status : foundJob.status,
                contactEmail: req.body.contactEmail ? req.body.contactEmail : foundJob.contactEmail,
                contactName: req.body.contactName ? req.body.contactName : foundJob.contactName,
        }, { 
            upsert: true 
        })
        .then(job => {
            console.log('job was updated', job);
            res.redirect(`/jobs/${req.params.id}`);
        })
        .catch(error => {
            console.log('error', error) 
            res.json({ message: "Error ocurred, please try again" })
        })
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    })
});


router.delete('/:id', (req, res) => {
    Job.findByIdAndRemove(req.params.id)
    .then(response => {
        console.log('This was deleted', response);
        res.json({ message: `Job ${req.params.id} was deleted`});
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" });
    })
});


// =============== BELOW RELATED TO COMMENTS ======================

// GET a Jobs tasks
router.get('/:id/comments', (req, res) => {
    Post.findById(req.params.id).populate('comments').exec()
    .then(post => {
        console.log('Hey is the post', post);
    })
})

// create a comment on a post
router.post('/:id/comments', (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        console.log('Heyyy, this is the post', post);
        // create and pust comment inside of post
        Comment.create({
            header: req.body.header,
            content: req.body.content
        })
        .then(comment => {
            post.comments.push(comment);
            // save the post
            post.save();
            res.redirect(`/posts/${req.params.id}`);
        })
        .catch(error => { 
            console.log('error', error);
            res.json({ message: "Error ocurred, please try again" });
        });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});

module.exports = router;