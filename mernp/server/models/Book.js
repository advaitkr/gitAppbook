const mongoose = require('mongoose')
const BookSchema = mongoose.Schema({
       _id: mongoose.Schema.Types.ObjectId,
       bookName:{type:String,require:true},
       author:{type:String,require:true},
       description:{type:String,require:true},
       feedback:{type:String,require:true},

});

module.exports = mongoose.model('Book',BookSchema)