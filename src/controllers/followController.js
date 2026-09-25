const { isUserFollowingService } = require("../services/followService");

const isUserFollowing = async (req, res) => {
    try {
        const { followerUserId, followedUserId } = req.params;

        if (!followerUserId || !followedUserId) {
            return res.status(400).json({
                message: 'Both user IDs are required',
            });
        }

        const isFollowing = await isUserFollowingService(followerUserId, followedUserId);

        return res.status(200).json({
            isFollowing,
        });
    } catch (error) {
        console.error(
            'Error in isUserFollowing controller:',
            error
        );

        return res.status(500).json({
            message: 'Failed to check follow status',
        });
    }
};

module.exports = { isUserFollowing };