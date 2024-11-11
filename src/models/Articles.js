import connection from "../config/db";
const ArticlesModel = {
  // lấy tất cả bài viết
  GetAllArticles: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT a.*,
      c.name AS category_name
      FROM articles a
      JOIN category AS c ON c.id = a.category_id
      WHERE a.is_deleted = 0`;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // lấy 1 bài viết theo id
  GetOneArticles: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM articles WHERE is_deleted = 0 AND id = ?`;
      connection.query(query, id, (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(results?.[0]);
        }
      });
    });
  },
   // lấy 1 bài viết theo code
   GetOneArticles_ByCode: (code) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM articles WHERE is_deleted = 0 AND code = ?`;
      connection.query(query, code, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // lấy bài viết theo loại
  GetOneArticles_ByCategory: (category) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM articles WHERE is_deleted = 0 AND category_id = ?`;
      connection.query(query, category, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // tạo mới
  CreateArticles: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO articles(user_id,category_id,name,date,image,content)
      VALUES (?,?,?,?,?,?)
      `;
      const values = [
        item.user_id,
        item.category_id,
        item.name,
        item.date,
        item.image,
        item.content,
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
  // chỉnh sửa
  UpdateArticles: (id, item) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE articles SET category_id = ?,name = ?,date = ?,image = ?,content = ?,active = ? WHERE id = ?
      `;
      const values = [
        item.category_id,
        item.name,
        item.date,
        item.image,
        item.content,
        item.active,
        id,
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
  // xóa
  RemoveArticles: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM articles WHERE id = ?`;
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
export default ArticlesModel;
