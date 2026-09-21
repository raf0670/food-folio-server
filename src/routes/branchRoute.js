const express = require('express');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { getBranchesByRestaurantIdService } = require('../services/branchService');
const router = express.Router();

router.get('/restaurant/:restaurantId', authenticateUser, getBranchesByRestaurantIdService);

module.exports = router;