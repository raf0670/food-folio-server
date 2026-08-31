const express = require('express');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { getCurrentUser, getProfileDisplayUserById, updateProfileBasicInformation } = require('../controllers/userController');

const router = express.Router();

router.get('/me', authenticateUser, getCurrentUser);
router.get('/profile/getUser/:userId', getProfileDisplayUserById);
router.patch('/profile/edit', authenticateUser, updateProfileBasicInformation);

module.exports = router;