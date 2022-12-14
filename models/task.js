const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: "test default"
    },
    description: {
        type: String,
        required: true,
        default: "default description"
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
    job: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Job'
    },
}, {timestamps: true}
)



module.exports = mongoose.model('Task', taskSchema);