const model = require('../models/group');
const rsvpModel = require('../models/rsvp');

exports.index = (req, res) => {
model.find()
.then(groups =>  res.render('./groups/index', {groups}))
.catch(err => next(err));
};

exports.new = (req, res) => {
res.render('./groups/addGroup');
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    Promise.all([model.findById(id).populate('dm', 'firstName lastName'), rsvpModel.find({group: id})])
    .then(results => {
        const [group, rsvp] = results;
if(group){
    console.log(rsvp);
    return res.render('./groups/group', {group, rsvp});
} else {
    let err = new Error('Unable to find group with id of' + id);
    err.status = 404;
    next(err);
}
    })
    .catch(err=> next(err));
   
};

exports.create = (req, res, next) => {
    let group = new model(req.body);
    group.dm = req.session.user;
    group.save()
    .then(group => {
        req.flash('success', 'Group made successfully');
        res.redirect('/groups');
        
    })
    .catch(err=> {
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            return res.redirect('back');
        }
        next(err);
});
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
 model.findById(id)
 .then(group=> {
    if(group){
       return res.render('./groups/editGroup', {group});
    } else {
        let err = new Error('Unable to find group with id of ' + id );
        err.status = 404;
        next(err);
    }
 })
 .catch(err=>next(err));
    
}

exports.update = (req, res) => {
 let group = req.body;
 let id = req.params.id;

 model.findByIdAndUpdate(id, group, {runValidators:true})
.then(group => {
 if(group){
    res.redirect('/groups/' + id);
 } else {
    err.status = 400;
    next(err);
 }
})
.catch(err=> {
if(err.name === 'ValidationError'){
    req.flash('error', err.message);
    return res.redirect('back');
}

});

}

exports.delete = (req, res) => {
    let id = req.params.id;
    model.findByIdAndDelete(id)
    .then(group => {
           if(group){
            res.redirect('/groups');
           } else {
            let err = new Error('Unable to find Group with id of ' + id);
            err.status = 404;
            next(err);
           }
    })
    .catch(err=>next(err));
};


exports.rsvpCreate = (req, res, next) => {

    let rsvp = new rsvpModel();
    rsvp.group = req.params.id;
    rsvp.user = req.session.user;

rsvp.save()
.then( rsvp => {
    req.flash('success', 'Successful rsvp');
    res.redirect('back');
})
.catch(err =>next(err));

}