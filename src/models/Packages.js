import connection from "../config/db";
const PackagesRouter = {
  // lấy các gói
  GetAllPackages: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM packages WHERE is_deleted = 0`;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // lấy 1 gói
  GetOnePackages: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM packages WHERE is_deleted = 0 AND id = ?`;
      connection.query(query, id, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // tạo mới
  CreatePackages: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO packages(user_id,name) VALUES (?,?)`;
      const values = [item.user_id, item.name];
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // chỉnh sửa
  UpdatePackages: (id, item) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE packages SET user_id = ?,name = ? WHERE id =?`;
      const values = [item.user_id, item.name, id];
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // xóa bỏ
  DeletePackages: (id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE packages SET is_deleted = ? WHERE id =?`;
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
export default PackagesRouter;
