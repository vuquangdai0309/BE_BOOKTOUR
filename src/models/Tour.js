import connection from "../config/db";
const TourModel = {
  // lấy tất cả
  GetAllTour: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT tours.*, 
      map.name AS name_map,
      map_suggest.name AS map_suggest
      FROM tours 
      JOIN map ON tours.point_id = map.id
      JOIN map AS map_suggest  ON FIND_IN_SET(map_suggest.id,tours.suggest_id) > 0 
      WHERE tours.is_deleted = 0 AND map.is_deleted = 0
     ORDER BY FIND_IN_SET(map_suggest.id, tours.suggest_id) , tours.id ASC
     ;
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
  // lấy theo id
  GetOneTour: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM tours
      WHERE is_deleted = 0 AND id = ?`;
      connection.query(query, id, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // lấy theo point_id điểm bắt đầu
  GetOneTour_ByPoint: (point) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT tours.*, 
      map.name AS name_map,
      map_suggest.name AS map_suggest
      FROM tours 
      JOIN map ON tours.point_id = map.id
      JOIN map AS map_suggest  ON FIND_IN_SET(map_suggest.id,tours.suggest_id) > 0 
      WHERE tours.is_deleted = 0 AND map.is_deleted = 0 AND point_id = ?
     ORDER BY FIND_IN_SET(map_suggest.id, tours.suggest_id)
     ;
      `;
      connection.query(query, point, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  // tạo mới
  CreateTour: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO tours(user_id,point_id,suggest_id) VALUES (?,?,?)`;
      const values = [item.user_id, item.point_id, item.suggest_id];
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // update
  UpdateTour: (id, item) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE tours SET user_id =?,point_id =?,suggest_id =? WHERE id = ?`;
      const values = [item.user_id, item.point_id, item.suggest_id, id];
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
  DeleteTour: (id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE tours SET is_deleted = 1 WHERE id = ?`;
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
export default TourModel;
