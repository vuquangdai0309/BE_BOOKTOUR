import connection from "../config/db";
import TourModel from "./Tour";
const BookingModel = {
  // lấy tất cả page
  GetAllBookingPage: (searchName) => {
    return new Promise((resolve, reject) => {
      let query = `SELECT bookings.*,
      map.name AS name_map,
      packages.name AS name_packages
      FROM bookings
      LEFT JOIN tours ON tours.id = bookings.tour_id
      JOIN map ON map.id = bookings.map_id
      JOIN packages ON packages.id = bookings.packages_id
      WHERE bookings.is_deleted = 0`;
      if (searchName) {
        query += ` AND bookings.full_name LIKE '%${searchName}%'`
      }
      connection.query(query, async (err, results) => {
        if (err) {
          return reject(err);
        } else {
          const newArr = []
          for (const booking of results) {
            const { tour_id, ...data } = booking
            if (tour_id) {
              const listTour = await TourModel.GetOneTour(tour_id)
              const newData = {
                tour_id: tour_id,
                ...data,
                suggest: listTour.suggest.length > 0 ? listTour.suggest : []
              }
              newArr.push(newData)
            }else{
              newArr.push(booking)
            }
          }
          return resolve(newArr);
        }
      });
    });
  },
  // lấy tất cả
  GetAllBooking: () => {
    return new Promise((resolve, reject) => {
      let query = `SELECT bookings.*,
      map.name AS name_map,
      packages.name AS name_packages
      FROM bookings
      LEFT JOIN tours ON tours.id = bookings.tour_id
      JOIN map ON map.id = bookings.map_id
      JOIN packages ON packages.id = bookings.packages_id
      WHERE bookings.is_deleted = 0`;
      connection.query(query, async (err, results) => {
        if (err) {
          return reject(err);
        } else {
          const newArr = []
          for (const booking of results) {
            const { tour_id, ...data } = booking
            if (tour_id) {
              const listTour = await TourModel.GetOneTour(tour_id)
              const newData = {
                tour_id: tour_id,
                ...data,
                suggest: listTour.suggest.length > 0 ? listTour.suggest : []
              }
              newArr.push(newData)
            }
          }
          return resolve(newArr.length > 0 ? newArr :results);
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
      const query = `INSERT INTO bookings (map_id,tour_id,packages_id,full_name,email,phone,note,booking_date)
      VALUES (?,?,?,?,?,?,?,?)
      `;
      const values = [
        item.map_id,
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
  updateStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE bookings SET status = ${status} WHERE id = ${id}`
      connection.query(query, (err, results) => {
        if (err) {
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
