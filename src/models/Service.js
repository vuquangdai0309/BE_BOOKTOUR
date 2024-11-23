import connection from "../config/db";
const ServiceModel = {
  // lấy tất cả
  GetAllService: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM service WHERE is_deleted = 0`;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // lấy 1
  GetOneService: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM service WHERE is_deleted = 0 AND id = ?`;
      connection.query(query, id, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // tạo
  CreateService: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO service (title,image,description) VALUES (?,?,?)`;
      const values = [item.title, item.image, item.description];
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
  UpdateService: (id, item) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE service SET title = ?,image = ?,description = ? WHERE id = ?`;
      const values = [item.title, item.image, item.description, id];
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
  RemoveService: (id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE service SET is_deleted = ? WHERE id = ?`;
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
export default ServiceModel;
