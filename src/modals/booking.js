const mongoose = require('mongoose')

const booking = new mongoose.Schema({
    bNo:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    room:[{
        type:mongoose.Types.ObjectId,
        ref:"room"
     }]

});

module.exports = mongoose.model('booking', booking);