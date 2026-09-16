const express = require('express');
const { getUserRestaurants, createRestaurant, getUnapprovedRestaurants, updateRestaurantApproval } = require('../controllers/restaurantController');
const { authenticateUser, authenticateAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/my', authenticateUser, getUserRestaurants);
router.post('/create', authenticateUser, createRestaurant);
router.get('/unapproved', authenticateAdmin, getUnapprovedRestaurants);
router.patch('/:id/approval', authenticateAdmin, updateRestaurantApproval);

module.exports = router;