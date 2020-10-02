const express = require('express');
const router = express.Router();// express router, new router object
const ctrl = require('../controllers');

router.get('/', ctrl.fruits.index);
router.get('/new', ctrl.fruits.newFruit);
router.get('/:index', ctrl.fruits.show);
router.post('/', ctrl.fruits.create);
router.delete('/:index', ctrl.fruits.deleteFruit);
router.get('/:index/edit',ctrl.fruits.editFruit);
router.put('/:index', ctrl.fruits.addFruit);

module.exports = router;