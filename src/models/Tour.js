import connection from "../config/db";
import MapModel from "./Map";
const TourModel = {
  // lấy tất cả
  GetAllTourPage: (searchName) => {
    return new Promise((resolve, reject) => {
      let query = `SELECT tours.*, 
      map.name AS name_map,
      map.logo AS logo_map,
      map.image AS image_map,
      map.open_hour AS open_hour
      FROM tours 
      JOIN map ON tours.point_id = map.id
      WHERE tours.is_deleted = 0 AND map.is_deleted = 0`;
      if(searchName){
        query += ` AND map.name LIKE '%${searchName}%'`
      }
      connection.query(query, async (err, results) => {
        if (err) {
          return reject(err);
        } else {
          const newArr = []
          for (const item of results) {
            const { suggest_id, ...data } = item
            const suggestArr = suggest_id.split(",").map(item => Number(item))
            // mảng chứa suggest name
            const suggest = []
            // tim kiem map theo suggest id
            for (const itemSuggest of suggestArr) {
              const mapById = await MapModel.getOneMap(itemSuggest)
              const nameMap = mapById.name
              suggest.push(nameMap)
            }
            const newData = {
              suggest: suggest,
              ...data
            }
            newArr.push(newData)
          }
          return resolve(newArr);
        }
      });
    });
  },
  // lấy tất cả
  GetAllTour: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT tours.*, 
      map.name AS name_map,
      map.logo AS logo_map,
      map.image AS image_map,
      map.open_hour AS open_hour
      FROM tours 
      JOIN map ON tours.point_id = map.id
      WHERE tours.is_deleted = 0 AND map.is_deleted = 0
     ;
      `;
      connection.query(query, async (err, results) => {
        if (err) {
          return reject(err);
        } else {
          const newArr = []
          for (const item of results) {
            const { suggest_id, ...data } = item
            const suggestArr = suggest_id.split(",").map(item => Number(item))
            // mảng chứa suggest name
            const suggest = []
            // tim kiem map theo suggest id
            for (const itemSuggest of suggestArr) {
              const mapById = await MapModel.getOneMap(itemSuggest)
              const nameMap = mapById.name
              suggest.push(nameMap)
            }
            const newData = {
              suggest: suggest,
              ...data
            }
            newArr.push(newData)
          }
          return resolve(newArr);
        }
      });
    });
  },
  // lấy theo id
  GetOneTour: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT t.*,
      m.name AS name_map
      FROM tours t
      JOIN map m ON m.id = t.point_id
      WHERE t.is_deleted = 0 AND t.id = ?`;
      connection.query(query, id, async (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            return reject(err)
          }
          const { suggest_id, ...data } = results[0]
          const suggestArr = suggest_id.split(",").map(item => Number(item))
          // mảng chứa suggest name
          const suggest = []
          // tim kiem map theo suggest id
          for (const itemSuggest of suggestArr) {
            const mapById = await MapModel.getOneMap(itemSuggest)
            const nameMap = mapById.name
            suggest.push(nameMap)
          }
          const newData = {
            suggest: suggest,
            suggest_id:suggest_id,
            ...data
          }
          resolve(newData);
        }
      });
    });
  },
  // lấy theo point_id điểm bắt đầu
  GetOneTour_ByPoint: (point) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT tours.*, 
      map.name AS name_map
      FROM tours 
      JOIN map ON tours.point_id = map.id
      WHERE tours.is_deleted = 0 AND map.is_deleted = 0 AND point_id = ${point}
     ;
      `;
      connection.query(query, async (err, results) => {
        if (err) {
          return reject(err);
        } else {
          const newArr = []
          for (const item of results) {
            const { suggest_id, ...data } = item
            const suggestArr = suggest_id.split(",").map(item => Number(item))
            // mảng chứa suggest name
            const suggest = []
            // tim kiem map theo suggest id
            for (const itemSuggest of suggestArr) {
              const mapById = await MapModel.getOneMap(itemSuggest)
              const nameMap = mapById.name
              suggest.push(nameMap)
            }
            const newData = {
              suggest: suggest,
              ...data
            }
            newArr.push(newData)
          }
          return resolve(newArr);
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
