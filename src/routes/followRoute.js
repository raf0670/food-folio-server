const express = require('express');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { isUserFollowing } = require('../controllers/followController');

const router = express.Router();

router.get('/is-following/:followerUserId/:followedUserId', isUserFollowing);

module.exports = router;