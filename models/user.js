const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    firstName: {type: String, required: [true, 'First name is a required field!']},
    lastName:  {type: String, required: [true, 'Last name is a required field!']},
    email: {type: String, required: [true, 'Email is a required field!'],
          unique: [true, 'This email is already registered to another account!']},
    password: {type: String, required: [true, 'password is a required field!']},
})

userSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.hash(user.password, 10)
    .then( hash => {
        user.password = hash;
        next();
    })
    .catch(err => next(error));
})

userSchema.methods.comparePassword = function(inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword , user.password);
}

module.exports = mongoose.model('User', userSchema);