import connection from "../config/db";
const CategoryModel = {
  // lấy tất cả các loại
  GetAllCategory: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM category WHERE is_deleted = 0`;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // lấy 1 loại
  GetOneCategory: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM category WHERE is_deleted = 0  AND id = ?`;
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
  CreateCategory: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO category(user_id,name) VALUES (?,?)`;
      connection.query(query, [item.user_id, item.name], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // chỉnh sửa
  UpdateCategory: (id, item) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE category SET name = ? WHERE id = ?`;
      connection.query(query, [item.name, id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // xóa
  RemoveCategory: (id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE category SET is_deleted = 1 WHERE id = ?`;
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
export default CategoryModel;
