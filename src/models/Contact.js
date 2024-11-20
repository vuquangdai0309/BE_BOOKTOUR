import connection from "../config/db";
const ContactModel = {
  // lấy tất cả
  GetAllContact: (search) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM contact WHERE full_name LIKE ? `;
      const values = "%" + search + "%";
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // lấy 1
  GetOneContact: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM contact WHERE id = ? `;
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
  CreateContact: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO contact(full_name,email,phone,note) VALUES (?,?,?,?) `;
      const values = [item.full_name, item.email, item.phone, item.note];
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
  UpdateContact: (id, item) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE contact SET full_name = ?,email = ?,phone = ?,note = ? WHERE id =?`;
      const values = [item.full_name, item.email, item.phone, item.note, id];
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // chỉnh sửa status
  ChangeStatusContact: (id, item) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE contact SET status = ? WHERE id =?`;
      const values = [item.status, id];
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
  RemoveContact: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM contact WHERE id = ? `;
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

export default ContactModel;
