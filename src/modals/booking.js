const mongoose = require('mongoose')

const booking = new mongoose.Schema({
    "bno":{
        type:String,
        required:true
    },
    "date":{
        type:Date,
        default:Date.now
    },
    "room":[{
        type:mongoose.Types.ObjectId,
        ref:"room"
     }]

});

module.exports = mongoose.model('booking', booking);