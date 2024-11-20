import connection from "../config/db";
import TourModel from "./Tour";
const MapModel = {
  // lấy tất cả Map
  getAllMap: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM map WHERE is_deleted = 0`;
      connection.query(query, async (err, results) => {
        if (err) {
          reject(err);
        } else {
          const newArr = [];
          for (const item of results) {
            const { id, ...data } = item;
            const listTourByMapId = await TourModel.GetOneTour_ByPoint(id)
            const newData = {
              id: id,
              listTourByMapId,
              ...data
            }
            newArr.push(newData);
          }
          return resolve(newArr);
        }
      });
    });
  },
  // lấy tất cả Map
  getAllMapPage: (searchName) => {
    return new Promise((resolve, reject) => {
      let query = `SELECT m.* 
      FROM map m 
      WHERE is_deleted = 0`;
      if (searchName) {
        query += ` AND m.name LIKE '%${searchName}%'`
      }
      connection.query(query, async (err, results) => {
        if (err) {
          reject(err);
        } else {
          const newArr = [];
          for (const item of results) {
            const { id, ...data } = item;
            const listTourByMapId = await TourModel.GetOneTour_ByPoint(id)
            const newData = {
              id: id,
              listTourByMapId,
              ...data
            }
            newArr.push(newData);
          }
          return resolve(newArr);
        }
      });
    });
  },

  // lấy 1 địa điểm
  getOneMap: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM map WHERE is_deleted = 0 AND id IN(?)`;
      connection.query(query, [id], async (err, results) => {
        if (err) {
          return reject(err);
        } else {
          if (results.length === 0) {
            return reject(err);
          }

          const { logo, ...data } = results[0];
          const newData = {
            id: id,
            logo: logo ? logo.replace(/\\/g, '/') : "",
            ...data,
          };
          return resolve(newData);
        }
      });
    });
  },
  getOneMapByCoordinates: (coordinates) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM map WHERE coordinates LIKE '%${coordinates}%'`;
      connection.query(query, async (err, results) => {
        if (err) {
          return reject(err);
        } else {
          if (results.length === 0) {
            return reject(err)
          }

          const {logo, ...data } = results[0]
        
          const newData = {
            ...data,
            logo: logo ? logo.replace(/\\/g, '/') : "",
          }
          return resolve(newData);
        }
      });
    });
  },
  // lấy địa điểm theo code
  getOneMap_ByCode: (code) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM map WHERE is_deleted = 0 AND code IN(?)`;
      connection.query(query, code, async (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(results);
        }
      });
    });
  },
  //tạo điểm du lịch
  createMap: (item) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO map( code , user_id,name , coordinates , logo , image , address , content , open_hour , title) VALUES (?,?,?,?,?,?,?,?,?,?)`;
      const values = [item.code, item.user_id, item.name, item.coordinates,item.logo,item.image,item.address,item.content,item.open_hour,item.title];
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
      const query = `UPDATE map SET name = ?,coordinates = ? , logo = ? , image = ? , address = ? , content = ? , open_hour = ? , title = ? WHERE id = ${id}`;
      const values = [item.name, item.coordinates,item.logo,item.image,item.address,item.content,item.open_hour,item.title];
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
