require('dotenv').config()
const mongoose = require('mongoose');
// import { randUser } from '@ngneat/falso';
const { randUser } = require('@ngneat/falso');

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
const Item = require('./models/item')

function createUsers() {
    for (let i = 0; i < 16; i++) {
        const userData = randUser();
        const newUser = new User({
            username: userData.email,
            full_name: userData.firstName + " " + userData.lastName,
            password: 'password',
            username: userData.username,
            day: "10",
            month: "10",
            year: "1990"
        })
        newUser.save();
    }
}

createUsers();



