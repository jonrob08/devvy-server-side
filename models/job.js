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
    tasks: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task'
    }]
}, {timestamps: true}
)

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;