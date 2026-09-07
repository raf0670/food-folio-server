const express = require('express');
const { getUserRestaurants, createRestaurant, getUnapprovedRestaurants } = require('../controllers/restaurantController');
const { authenticateUser, authenticateAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/my', authenticateUser, getUserRestaurants);
router.post('/create', authenticateUser, createRestaurant);
router.get('/unapproved', authenticateAdmin, getUnapprovedRestaurants);

module.exports = router;