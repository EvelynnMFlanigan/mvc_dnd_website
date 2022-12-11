const express = require('express');
const controller = require('../controllers/groupController');
const {isLoggedIn, isDm} = require('../middlewares/auth');
const {validateId, validateGroup} = require('../middlewares/validators');

const router = express.Router();


router.get('/', controller.index);

router.get('/addGroup', isLoggedIn, controller.new);

router.get('/:id', validateId,  controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isDm, controller.edit);

router.put('/:id', validateId, isLoggedIn, validateGroup, isDm, validateGroup, controller.update);

router.delete('/:id', validateId, isLoggedIn, isDm, controller.delete);

router.post('/:id/rsvp', isLoggedIn ,controller.rsvpCreate);

router.post('/', isLoggedIn, validateGroup, controller.create);

module.exports = router;