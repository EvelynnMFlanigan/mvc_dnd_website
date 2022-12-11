const mongoose = require('mongoose');
const Schema = mongoose.Schema;







const groupSchema = new Schema({
        dm: {type: Schema.Types.ObjectId , ref: 'User'},
        version : {type: String, required: [true, 'Version is a required field']},
        description : {type: String, required: [true, 'Description is a required field'], minlength: [20, 'Description must be longer']},
        dayOfWeek: {type: String, required: [true, 'Day is a required field']},
        location: {type: String, required: [true, 'Location is a required field']},
        gameName : {type: String, required: [true, 'DM is a required field']},
        startTime : {type: String, required: [true, 'DM is a required field']},
        endTime : {type: String, required: [true, 'DM is a required field']}
});



module.exports = mongoose.model('Group', groupSchema);