const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
   roomNo:{
        type:String,
        required:true
    }
    
   
});

module.exports = mongoose.model('room',roomSchema);