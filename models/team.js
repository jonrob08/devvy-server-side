const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Team', teamSchema);