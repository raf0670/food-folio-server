const { db } = require("../config/dbConfig");

const isUserFollowingService = async (followerUserId, followingUserId) => {
    try {
        const follow = await db.oneOrNone(
            `
            SELECT 1
            FROM follow
            WHERE follower_id = $1
              AND following_id = $2
            `,
            [followerUserId, followingUserId]
        );

        return !!follow;
    } catch (error) {
        console.error('Error checking follow status:', error);
        throw error;
    }
};

module.exports = { isUserFollowingService };