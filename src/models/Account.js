import connection from "../config/db";
const AccountModel = {
  //  tất cả tài khoản
  GetAllAccount: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM account WHERE is_deleted = 0`;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // lấy 1 tài khoản
  GetOneAccount: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM account WHERE is_deleted = 0 AND id = ?`;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // login
  LoginAccount: (username, password) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM account WHERE is_deleted = 0 AND user_name = ? AND password = ?`;
      connection.query(query, [username, password], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // tạo tk
  CreatedAccount: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO account (code,role_id,full_name,user_name,address,avatar,email,phone,password)
      VALUES(?,?,?,?,?,?,?,?,?)
      `;
      const values = [
        item.code,
        item.role_id,
        item.full_name,
        item.user_name,
        item.address,
        item.avatar,
        item.email,
        item.phone,
        item.password,
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
  //update
  UpdatedAccount: (id, item) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE account SET role_id = ?,full_name = ?,user_name = ?,address = ?,avatar = ?,email = ?,phone = ?,password = ?
      WHERE id = ?
      `;
      const values = [
        item.role_id,
        item.full_name,
        item.user_name,
        item.address,
        item.avatar,
        item.email,
        item.phone,
        item.password,
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
  // lấy tài khoản theo email username
  GetAccount_ByEmailAndUserName: (email, username) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM account WHERE is_deleted = 0 AND email = ? OR user_name =?`;
      connection.query(query, [email, username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // lấy tài khoản theo email
  GetAccount_ByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM account WHERE is_deleted = 0 AND email = ?`;
      connection.query(query, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // xóa
  RemoveAccount: (id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE account SET is_deleted = 1 WHERE id = ?`;
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
export default AccountModel;
