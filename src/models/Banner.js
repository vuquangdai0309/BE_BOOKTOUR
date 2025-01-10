import connection from "../config/db";
const BannerModel = {
    // lấy tất cả
    GetBanner: () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM banner`;
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results?.[0]);
                }
            });
        });
    },
    // lấy 1
    updateBanner: (id,data) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE banner SET title = ? , description = ? , image = ? WHERE _id = ${id}`;
            const VALUES = [data.title,data.description,data.image]
            connection.query(query, VALUES, (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
        });
    },
};

export default BannerModel;
