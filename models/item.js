const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    dueDate: {
        type: Date
    },
    timeSpent: {
        type: String
    }
}, {timestamps: true}
)

const TaskInfo = mongoose.model('Item', itemSchema);

module.exports = TaskInfo;