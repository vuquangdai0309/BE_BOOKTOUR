import connection from "../config/db";
const MapModel = {
  // lấy tất cả Map
  getAllMap: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM map WHERE is_deleted = 0`;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // lấy 1 địa điểm
  getOneMap: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM map WHERE is_deleted = 0 AND id = ?`;
      connection.query(query, id, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  //tạo điểm du lịch
  createMap: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO map(code,user_id,name,coordinates,type) VALUES (?,?,?,?,?)`;
      const values = [
        item.code,
        item.user_id,
        item.name,
        item.coordinates,
        item.type,
      ];
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // update
  updateMap: (id, item) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE map SET name = ?,coordinates = ? WHERE id = ?`;
      const values = [item.name, item.coordinates, id];
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // Xóa
  deleteMap: (id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE map SET is_deleted = 1 WHERE id = ?`;
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
export default MapModel;
