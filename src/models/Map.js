import connection from "../config/db";
import MapDetailModel from "./MapDetail";
const MapModel = {
  // lấy tất cả Map
  getAllMap: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM map WHERE is_deleted = 0`;
      connection.query(query, async (err, results) => {
        if (err) {
          reject(err);
        } else {
          if(results.length === 0){
            return reject(err)
          }
          const newArr = []
          for (const item of results) {
            const { id, ...data } = item
            const listMapDetail = await MapDetailModel.GetMapDetailByMapId(item.id)
           if(listMapDetail){
             const { id: mapDetail_id, ...dataDetail } = listMapDetail
             const newData = {
               id: id,
               ...data,
               mapDetail_id: mapDetail_id,
               ...dataDetail
             }
             newArr.push(newData)
           }
          }
          resolve(newArr);
        }
      });
    });
  },
  // lấy 1 địa điểm
  getOneMap: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM map WHERE is_deleted = 0 AND id = ${id}`;
      console.log(query)
      connection.query(query, async (err, results) => {
        if (err) {
          return reject(err);
        } else {
          if (results.length === 0) {
            return reject(err)
          }

          const { ...data } = results[0]
          const dataDetail = await MapDetailModel.GetMapDetailByMapId(id)
          const { id: mapDetail_id,logo, ...items } = dataDetail
          const newData = {
            id: id,
            ...data,
            logo:logo.replace(/\\/g, '/'),
            mapDetail_id: mapDetail_id,
            ...items
          }
          return resolve(newData);
        }
      });
    });
  },
  //tạo điểm du lịch
  createMap: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO map(code,user_id,name,coordinates) VALUES (?,?,?,?)`;
      const values = [
        item.code,
        item.user_id,
        item.name,
        item.coordinates,
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
  // update
  updateMap: (id, item) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE map SET name = ?,coordinates = ? WHERE id = ?`;
      const values = [item.name, item.coordinates, id];
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // Xóa
  deleteMap: (id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE map SET is_deleted = 1 WHERE id = ?`;
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
export default MapModel;
