const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    profilePreferences: {
        
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Job'
    }],
    team: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team'
    }]
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;