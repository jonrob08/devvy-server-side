// Imports
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const AuthRoute = require('./routes/Auth');
const PostRoute = require('./routes/Post');
const UserRoute = require('./routes/User');
const JobRoute = require('./routes/Job')
const TeamRoute = require('./routes/Team')

// Init App
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json({limit:"100mb"})); // JSON parsing
app.use(cors()); // allow all CORS requests
app.use(morgan('tiny'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// API Routes
app.get('/', (req, res) => {
  res.send("You are connected succesfully");
});

const baseURL = '/api/v1'

app.use(`${baseURL}/auth`, AuthRoute);
app.use(`${baseURL}/post`, PostRoute);
app.use(`${baseURL}/user`, UserRoute);
app.use(`${baseURL}/job`, JobRoute);
app.use(`${baseURL}/team`, TeamRoute);

// Database Set Up and Connection
const PORT = process.env.PORT || 8000;

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Runing on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
