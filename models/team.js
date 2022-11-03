const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    teamMembers: {
        type: Array,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Team', teamSchema);