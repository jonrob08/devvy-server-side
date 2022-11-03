const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type:String,
    },
    full_name:{
        type:String,
    },
    profile_pic:{
        type:String,
        default:"https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg"
    },
    cover_pic:{
        type:String,
        default:""
    },
    mobile:{
        type:Number,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    day:{
        type:String,
    },
    month:{
        type:String,
    },
    year:{
        type:String,
    },
    gender:{
        type:String,
        default:"male"
    },
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    jobs: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Job'
    }],
    team: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team'
    }],
},{
    timestamps: true
})

module.exports = mongoose.model('user', UserSchema);