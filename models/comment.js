const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('comment' , commentSchema);