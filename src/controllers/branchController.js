const { getBranchesByRestaurantIdService } = require("../services/branchService");
const { checkRestaurantManagerService } = require("../services/restaurantService");

const getBranchesByRestaurantId = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const userId = req.user.userId;

        if (!restaurantId) {
            return res.status(400).json({
                message: 'Restaurant ID is required',
            });
        }

        // Check whether the authenticated user manages this restaurant
        const isManager = await checkRestaurantManagerService(userId, restaurantId);

        if (!isManager) {
            return res.status(403).json({
                message: 'You do not have access to this restaurant',
            });
        }

        const branches = await getBranchesByRestaurantIdService(restaurantId);

        return res.status(200).json({
            branches,
        });
    } catch (error) {
        console.error('Error in getBranchesByRestaurantId:', error);

        return res.status(500).json({
            message: 'Failed to fetch branches',
        });
    }
};