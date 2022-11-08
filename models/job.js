const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    contactEmail: {
        type: String
    },
    contactName: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team'
    }],
}, {timestamps: true}
)

module.exports = mongoose.model('job', jobSchema);
