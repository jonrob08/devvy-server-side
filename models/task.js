const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    dueDate: {
        type: Date
    },
    timeSpent: {
        type: String
    },
    taskInfo: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Item'
    }]
}, {timestamps: true}
)

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;