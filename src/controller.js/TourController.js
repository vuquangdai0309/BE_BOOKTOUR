import jwt from "jsonwebtoken";
import TourModel from "../models/Tour";

class TourController {
  // [GET]
  async GetAllTour(req, res) {
    try {
      const tours = await TourModel.GetAllTour();
      if (tours.length > 0) {
        const tourMap = new Map();
        tours.forEach((element) => {
          if (!tourMap.has(element.id)) {
            tourMap.set(element.id, {
              id: element.id,
              name_map: element.name_map,
              suggest: [],
            });
          }
          const getTourMap = tourMap.get(element.id);
          getTourMap.suggest.push(element.map_suggest);
        });
        const data = Array.from(tourMap.values());
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // [GET]
  async GetOneTour(req, res) {
    try {
      const id = req.params.id;
      const tours = await TourModel.GetOneTour(id);
      res.status(200).json({ tours: tours[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // [GET]
  async GetOneTour_ByPoint(req, res) {
    try {
      const point = req.params.point;
      const tours = await TourModel.GetOneTour_ByPoint(point);
      if (tours.length > 0) {
        const tourMap = new Map();
        tours.forEach((element) => {
          if (!tourMap.has(element.point_id)) {
            tourMap.set(element.point_id, {
              name_map: element.name_map,
              suggestObj: new Map(),
            });
          }
          const getTourMap = tourMap.get(element.point_id);
          if (element.id !== null) {
            if (!getTourMap.suggestObj.has(element.id)) {
              getTourMap.suggestObj.set(element.id, {
                id: element.id,
                suggest: [],
              });
            }
          }
          const getSuggestTourMap = getTourMap.suggestObj.get(element.id);
          getSuggestTourMap.suggest.push(element.map_suggest);
        });
        const data = Array.from(tourMap.entries()).map(([id, item]) => {
          return {
            point_id: id,
            name_map: item.name_map,
            suggestArray: Array.from(item.suggestObj.values()),
          };
        });
        res.status(200).json({data:data[0]});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // [POST]
  async CreateTour(req, res) {
    try {
      let token = req.cookies[process.env.COOKIE];
      let par = jwt.verify(token, process.env.SECRET);
      const form = {
        user_id: par.id,
        ...req.body,
      };
      await TourModel.CreateTour(form);
      res.status(200).json({ message: "Thêm bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // [PATCH]
  async UpdateTour(req, res) {
    try {
      const id = req.params.id;
      let token = req.cookies[process.env.COOKIE];
      let par = jwt.verify(token, process.env.SECRET);
      const form = {
        user_id: par.id,
        ...req.body,
      };
      await TourModel.UpdateTour(id, form);
      res.status(200).json({ message: "Chỉnh sửa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // [DELETE]
  async RemoveTour(req, res) {
    try {
      const id = req.params.id;
      await TourModel.DeleteTour(id);
      res.status(200).json({ message: "Xóa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
}
export default new TourController();
