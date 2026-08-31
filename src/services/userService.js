const { db } = require("../config/dbConfig");

const getUserById = async (id) => {
    return await db.oneOrNone(`
        SELECT
            id,
            created_at,
            name,
            email,
            profile_picture_url,
            current_city,
            current_country,
            role,
            bio
        FROM users
        WHERE id = $1
        `,
        [id]
    );
};

const updateUserProfileInDb = async (userId, fieldsToUpdate) => {
    const { name, bio, current_city, current_country } = fieldsToUpdate;

    return await db.oneOrNone(`
        UPDATE public.users
        SET 
            name = $/name/,
            bio = $/bio/,
            current_city = $/current_city/,
            current_country = $/current_country/
        WHERE id = $/userId/
        RETURNING 
            id,
            created_at,
            name,
            email,
            profile_picture_url,
            current_city,
            current_country,
            role,
            bio
    `, {
        name,
        bio,
        current_city,
        current_country,
        userId
    });
};

module.exports = { getUserById, updateUserProfileInDb };
