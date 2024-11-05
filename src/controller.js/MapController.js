import MapModel from "../models/Map";
import Generate from "../middlewares/generate";
import jwt from "jsonwebtoken";
class MapController {
  //[GET]
  async GetAll(req, res) {
    try {
      const maps = await MapModel.getAllMap();
      res.status(200).json(maps);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[GET]
  async GetOne(req, res) {
    try {
      const id = req.params.id;
      const maps = await MapModel.getOneMap(id);
      res.status(200).json(maps);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[POST]
  async CreateMap(req, res) {
    try {
      let token = req.cookies[process.env.COOKIE];
      let par = jwt.verify(token, process.env.SECRET);
      const form = {
        code: Generate(8),
        user_id: par.id,
        ...req.body,
      };
      await MapModel.createMap(form);
      res.status(200).json({ message: "Thêm bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async UpdateMap(req, res) {
    try {
      const id = req.params.id;
      const form = {
        ...req.body,
      };
      await MapModel.updateMap(id, form);
      res.status(200).json({ message: "Thêm bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async DeleteMap(req, res) {
    try {
      const id = req.params.id;
      await MapModel.deleteMap(id);
      res.status(200).json({ message: "Xóa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
}

export default new MapController();
