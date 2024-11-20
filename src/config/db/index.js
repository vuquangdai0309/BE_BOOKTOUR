import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "booktour",
  // host: process.env.DB_HOST,
  // user: process.env.MYSQL_USER,
  // password: process.env.MYSQL_PASSWORD,
  // database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

connection.getConnection((err, pool) => {
  if (err) {
    console.error("Không thể kết nối MySQL:", err);
  } else {
    pool.release();
    console.log("Đã kết nối thành công đến MySQL");
  }
});
export default connection;
