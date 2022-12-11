const Group = require('../models/group');


exports.isGuest = (req, res, next) => {
     if(!req.session.user){
        return next();
     } else {
        req.flash('error', 'you are already logged in!');
        return res.redirect('/user/profile')
     }
}

exports.isLoggedIn = (req, res, next) => {
    if(req.session.user){
        return next();
    } else {
        req.flash('error', 'you need to be logged in to continue');
        return res.redirect('/user/login')
    }
}

exports.isDm = (req, res, next) => {
let id = req.params.id
Group.findById(id)
.then( group => {
    if(group){
  if(group.dm == req.session.user){
    return next();
  } else {
    let err = new Error('Unauthorized access. you must be the group leader to access this page');
    err.status = 401;
    return next(err);
  }
} else {
    let err = new Error('Unable to find group with id of ' + req.params.id )
    err.status = 404;
    return next(err);
}

})
.catch(err=> next(err));
}