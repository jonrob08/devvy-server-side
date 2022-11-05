// Imports
require('dotenv').config()
const mongoose = require('mongoose');

// Database Set Up
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
})


const User = require('./models/user');
const Job = require('./models/job');
const Task = require('./models/task');

// Job.create({
//     title: "Test Job 2",
//     url: "www.google.com",
//     description: "This is our first test job for devvy",
//     status: "In Progress",
//     contactEmail: "gmail@google.com",
//     contactName: "Test McTest",
// })
// .then(job => {
//     console.log(job)
// })
// .catch(error => {
//     console.log('error>>>>>', error)
// })


// Post schema with association to comments
// const newJob = new Job({
//     title: "This job should have a task",
//     url: "www.google.com",
//     description: "This is a test for associations",
//     status: "In Progress",
//     contactEmail: "gmail@google.com",
//     contactName: "Test McTest",
// })

// const newTask = new Task({
//     title: 'Our first task',
//     description: 'this is a task',
//     status: "Complete", 
//     dueDate: '2022-11-15',
//     timeSpent: 'Hella',
// })

// newTask.save()

// newJob.tasks.push(newTask)

// newJob.save(function(err){
//     if (err) return console.log(err)
//     console.log('Created task')
// })


const newUser = new User({
    username: "BigDog10",
    full_name: "Sam Shaffer",
    cover_pic: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
    mobile: 9168675309,
    email: "bigdog10@gmail.com",
    password: "12345600",
    day: "10",
    month: "10",
    year: "1990",
    gender: "male",
})

newUser.save((err) => {
    if(err) return console.log(err)
    console.log('New user created')
})
