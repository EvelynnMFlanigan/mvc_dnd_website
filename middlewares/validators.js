const {body} = require('express-validator');
const {validationResult} = require('express-validator');


exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid group id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = [
body('firstName', 'First name can not be empty').notEmpty().trim().escape(),
body('lastName', 'Last name can not be empty').notEmpty().trim().escape(),
body('email', 'Email must be valid').isEmail().trim().escape().normalizeEmail(),
body('password','password must be 8 characters minimum and 64 characters maximum').isLength({min: 8, max: 64})

];

exports.validateLogIn = [
body('email', 'Email must be valid').isEmail().trim().escape().normalizeEmail(),
body('password','password must be 8 characters minimum and 64 characters maximum').isLength({min: 8, max: 64})
];

exports.validateResult = (req, res, next) => {
let errors = validationResult(req);
if(!errors.isEmpty()){
errors.array().forEach(error =>{
    req.flash('error', error.msg);
});
return res.redirect('back')
} else {
return next();
}
}

exports.validateGroup = [
body('gameName', 'Title field can not be empty').notEmpty().trim().escape().isLength({min: 5, max: 15}),
body('description', 'Description must be at leaast 10 characters long').notEmpty().trim().escape().isLength({min: 20}),
body('location', 'Location can not be empty').notEmpty().trim().escape().isLength({min: 5}),
body('startTime', 'Start time can not be empty').notEmpty().trim().escape(),
body('endTime', 'End time can not be empty').notEmpty().trim().escape(),



];