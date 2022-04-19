const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth');
const { CAM } = require('../middleware/message');
const room = require('../controllers/room');

router.get('/:id', [auth], room.getRoom);
router.post('/:id', [auth, CAM], room.create);
router.get('/:id/leave', auth ,  room.leaveRoom);
router.get('/create/:id', auth ,  room.createRoom);
router.get('/invoke/:id', auth ,  room.invokeFriend);

module.exports = router