import jwt from "jsonwebtoken";
import TourModel from "../models/Tour";

class TourController {
  // [GET]
  async GetAllTour(req, res) {
    try {
      const tours = await TourModel.GetAllTour();
       return res.status(200).json(tours);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // [GET]
  async GetOneTour(req, res) {
    try {
      const id = req.params.id;
      const tour = await TourModel.GetOneTour(id);
      console.log(tour)
      res.status(200).json(tour);
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
      return res.status(200).json(tours);
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
      return res.status(203).json({ message: "Xóa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Có lỗi xảy ra khi xóa" });
    }
  }
}
export default new TourController();
