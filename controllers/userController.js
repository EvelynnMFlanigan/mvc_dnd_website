const model = require('../models/user');
const Group = require('../models/group');
const rsvpModel = require('../models/rsvp');

//renders the sign-up page
exports.new = (req, res) => {
    return res.render('./user/new');
};


//adds new user to model if the validations are passed
exports.create = (req, res, next) => {
     let user = new model(req.body);


     if(user.email){
      user.email = user.email.toLowerCase();
     }

     user.save()
     .then(user => {
        req.flash('success', 'Welcome!' );
        res.redirect('/user/login');
     })
     .catch( err => {
         if(err.name === 'validationError'){
          req.flash('error', err.Message);
          return res.redirect('back');
         }

         if(err.code === 11000){
            req.flash('error', 'Email is already in use!');
            return res.redirect('back');
         }
         next(err);
     }
     );
}


//render login page
exports.userLogin = (req, res, next) => {
     return res.render('./user/login')
}

//handle user login

exports.login = (req, res, next) => {
    let email = req.body.email;

    if(email) {
        email = email.toLowerCase();
    }

    let password = req.body.password;
    model.findOne({ email: email})
    .then( user => {
        if(!user){
             req.flash('error', 'Email adress is wrong!');
             res.redirect('/user/login');
        } else {
            user.comparePassword(password)
            .then( result => {
                if(result){
                    req.session.user = user._id;
                    req.flash('success', 'Successfully logged in!');
                    res.redirect('/user/profile');
                } else {
                    req.flash('error', 'Inccorect password. please try again');
                    res.redirect('/user/login');
                }
            }

            )
        }
    }
    )
    .catch(err => next(err));
}

exports.profile = (req, res, next) => {
    let id = req.session.user;
    Promise.all([model.findById(id), Group.find({dm: id})])
    .then( results => {
        const [user, groups] = results;

        res.render('./user/profile', {user, groups});
    })
    .catch(err => next(err));
}

exports.logout = (req, res, send) => {
    req.session.destroy(err =>{
        if(err){
        return next(err);
        } else {
             res.redirect('/')
        }}
        );
}