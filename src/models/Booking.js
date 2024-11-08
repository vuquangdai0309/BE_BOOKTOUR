import connection from "../config/db";
const BookingModel = {
  // lấy tất cả
  GetAllBooking: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT bookings.*,
      map.name AS name_map,
      packages.name AS name_packages
      FROM bookings
      JOIN tours ON tours.id = bookings.tour_id
      JOIN map ON FIND_IN_SET(map.id,tours.suggest_id) > 0 
      JOIN packages ON packages.id = bookings.packages_id
      WHERE bookings.is_deleted = 0
      ORDER BY FIND_IN_SET(map.id, tours.suggest_id) 
      `;
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // lấy 1 bản ghi
  GetOneBooking: (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT bookings.*,
        map.name AS name_map,
        packages.name AS name_packages
        FROM bookings
        JOIN tours ON tours.id = bookings.tour_id
        JOIN map ON FIND_IN_SET(map.id,tours.suggest_id) > 0 
        JOIN packages ON packages.id = bookings.packages_id
        WHERE bookings.is_deleted = 0 AND bookings.id = ?
        ORDER BY FIND_IN_SET(map.id, tours.suggest_id)
        `;
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
  CreateBooking: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO bookings (tour_id,packages_id,full_name,email,phone,note,booking_date)
      VALUES (?,?,?,?,?,?,?)
      `;
      const values = [
        item.tour_id,
        item.packages_id,
        item.full_name,
        item.email,
        item.phone,
        item.note,
        item.booking_date,
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
  UpdateBooking: (id, item) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE bookings SET tour_id = ?,packages_id = ?,full_name = ?,email = ?,phone = ?,note = ?,booking_date = ? WHERE id = ?`;
      const values = [
        item.tour_id,
        item.packages_id,
        item.full_name,
        item.email,
        item.phone,
        item.note,
        item.booking_date,
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
  // update status
  updateStatus:(id,status) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE bookings SET status = ${status} WHERE id = ${id}`
      connection.query(query,(err,results) => {
        if(err){
          return reject(err)
        }
        return resolve(results)
      })
    })
  },
  // xóa
  RemoveBooking: (id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE bookings SET is_deleted = 1 WHERE id = ?`;
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
export default BookingModel;
