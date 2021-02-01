const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/profile', ctrl.users.renderProfile);
router.put('/profile', ctrl.users.editProfile);
router.delete('/', ctrl.users.deleteUser);

module.exports = router;