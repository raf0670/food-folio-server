const { db } = require("../config/dbConfig");

const getBranchesByRestaurantIdService = async (restaurantId) => {
    try {
        const branches = await db.manyOrNone(
            `
            SELECT *
            FROM branches
            WHERE restaurant_id = $1
            ORDER BY branch_name ASC
            `,
            [restaurantId]
        );

        return branches;
    } catch (error) {
        console.error('Error fetching branches:', error);
        throw error;
    }
};

module.exports = { getBranchesByRestaurantIdService };