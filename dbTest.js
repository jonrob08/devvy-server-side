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


const Job = require('./models/job');

Job.create({
    title: "Test Job 2",
    url: "www.google.com",
    description: "This is our first test job for devvy",
    status: "In Progress",
    contactEmail: "gmail@google.com",
    contactName: "Test McTest",
})
.then(job => {
    console.log(job)
})
.catch(error => {
    console.log('error>>>>>', error)
})