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
          return reject(err);
        } else {
          return resolve(results?.[0]);
        }
      });
    });
  },
  // tạo mới
  CreatePackages: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO packages(user_id,name,is_active) VALUES (?,?,?)`;
      const values = [item.user_id, item.name,item.is_active];
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
      const query = `UPDATE packages SET name = ? ,is_active = ? WHERE id =?`;
      const values = [item.name,item.is_active, id];
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
      const query = `DELETE FROM packages WHERE id = ?`;
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
