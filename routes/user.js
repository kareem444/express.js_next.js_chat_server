const express = require('express');
const searchForUser = require('../controllers/search');
const { getUserInformation, getUserProfile ,setWink } = require('../controllers/user');
const auth = require('../middleware/auth');
const router = express.Router()
const friendsRequests = require('../controllers/friendRequest')

router.get('/', auth, getUserInformation);
router.get('/profile/:id', auth, getUserProfile);
router.post('/search', auth, searchForUser);
router.get('/wink/:id', auth, setWink);
router.post('/friendrequest/:id', auth, friendsRequests.friendRequest);
router.get('/makefriendrequest/:id', auth, friendsRequests.makeFriendRequest);
router.get('/deletefriendrequest/:id', auth, friendsRequests.deleteFriendRequest);
router.get('/deletefriend/:id', auth, friendsRequests.deleteFriend);

module.exports = router