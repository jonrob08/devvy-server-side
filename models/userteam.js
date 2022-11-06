const mongoose = require('mongoose');

const UserTeamSchema = mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    team: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team'
    }],
},{
    timestamps: true
})

module.exports = mongoose.model('UserTeam', UserTeamSchema);