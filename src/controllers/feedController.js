const feedService = require('../services/feedService');

const getFeedData = async (req, res) => {
    try {
        const { lat, lng, city, country, radius, search } = req.query;
        const rad = (parseInt(radius) || 10) * 1000;

        let reviews = [];

        // if location access given
        if (lat && lng) {
            reviews = await feedService.getReviewsByRadius(lat, lng, rad, search);
        } 
        // if no location given
        else if (city) {
            reviews = await feedService.getReviewsByCity(city, search);
        } 
        else {
            return res.status(400).json({ message: "Location parameters are missing!" });
        }

        return res.status(200).json(reviews);

    } catch (error) {
        console.error("Feed Controller Error:", error);
        return res.status(500).json({ message: "Server error while fetching feed." });
    }
};

module.exports = { getFeedData };