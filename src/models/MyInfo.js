import connection from "../config/db";
const MyInfoModel = {
    GetMyInfo: () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM my_info`;
            connection.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results?.[0]);
                }
            });
        });
    },
    // cap nhat
    updateMyInfo: (id, data) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE my_info SET title = ? , sub_title = ? , logo = ? , tel = ? WHERE _id = ${id}`;
            const VALUES = [data.title, data.sub_title, data.logo, data.tel]
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

export default MyInfoModel;
