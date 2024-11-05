import connection from "../config/db";
const ViewMapModel = {
  // lấy viewmap
  GetOneViewMap: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM viewmap WHERE is_deleted = 0 LIMIT 1 `;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // tạo viewmap
  CreateViewMap: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO viewmap (user_id,lat,lng,zoomlevel) VALUES (?,?,?,?)`;
      const values = [item.user_id, item.lat, item.lng, item.zoomlevel];
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // xóa
  RemoveViewMap: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM viewmap WHERE id = ?`;
      connection.query(query, id, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
export default ViewMapModel;
