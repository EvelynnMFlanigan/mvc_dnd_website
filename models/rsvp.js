const mongoose = require('mongoose');
const Schema = mongoose.Schema;






const rsvpSchema = new Schema({
    group: {type: Schema.Types.ObjectId, ref: 'Group'},
    user:  {type: Schema.Types.ObjectId , ref: 'User'}
            
})


module.exports = mongoose.model('Rsvp', rsvpSchema);