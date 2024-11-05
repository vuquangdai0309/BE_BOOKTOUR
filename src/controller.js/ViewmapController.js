import jwt from "jsonwebtoken";
import ViewMapModel from "../models/ViewMap";
import { message } from "antd";
class ViewMapController {
  //[GET]
  async GetOneViewmap(req, res) {
    try {
      const viewmap = await ViewMapModel.GetOneViewMap();
      res.status(200).json({ viewmap: viewmap[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[POST]
  async CreateViewmap(req, res) {
    try {
      let token = req.cookies[process.env.COOKIE];
      let par = jwt.verify(token, process.env.SECRET);
      const viewmap = await ViewMapModel.GetOneViewMap();
      const form = {
        user_id: par.id,
        ...req.body,
      };
      if (viewmap.length > 0) {
        ViewMapModel.RemoveViewMap();
      }
      ViewMapModel.CreateViewMap(form);
      res.status(200).json({ message: "Thêm bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
}
export default new ViewMapController();
