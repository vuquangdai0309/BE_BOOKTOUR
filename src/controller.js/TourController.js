import jwt from "jsonwebtoken";
import TourModel from "../models/Tour";

class TourController {
  // [GET]
  async GetAllTourPage(req, res) {
    try {
      const { searchName, page = 1,pageSize: sizePage } = req.query;
      const pageSize = sizePage ? sizePage : 6; // Kích thước trang
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const tours = await TourModel.GetAllTourPage(searchName);
      const totalRecords = tours.length; // Tổng số bản ghi
      const totalPages = Math.ceil(totalRecords / pageSize);
      const pages = Array.from({ length: totalPages }, (_, index) => {
        return {
          number: index + 1,
          active: index + 1 === page,
          isDots: index + 1 > 5,
        };
      });
      const paginatedData = tours.slice(startIndex, endIndex);
      const views = {
        results: paginatedData,
        pagination: {
          prev: page > 1 ? page - 1 : null,
          next: endIndex < totalRecords ? page + 1 : null,
          pages: pages,
          totalPages: totalPages,
          pageSize: pageSize,
          totalRecords: totalRecords // Thêm tổng số bản ghi
        },
      };
      return res.status(200).json(views);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
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
