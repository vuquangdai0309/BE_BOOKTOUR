
import PackagesRouter from "../models/Packages";
import jwt from "jsonwebtoken";
class PackagesController {
  //[GET]
  async GetAllPackages(req, res) {
    try {
      const packages = await PackagesRouter.GetAllPackages();
      res.status(200).json(packages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[GET]
  async GetOnePackages(req, res) {
    try {
      const id = req.params.id;
      const packages = await PackagesRouter.GetOnePackages(id);
      res.status(200).json({ packages: packages[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[POST]
  async CreatePackages(req, res) {
    try {
      let token = req.cookies[process.env.COOKIE];
      let par = jwt.verify(token, process.env.SECRET);
      const form = {
        user_id: par.id,
        name: req.body.name,
      };
      await PackagesRouter.CreatePackages(form);
      res.status(200).json({ message: "Thêm bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async UpdatePackages(req, res) {
    try {
      const id = req.params.id;
      let token = req.cookies[process.env.COOKIE];
      let par = jwt.verify(token, process.env.SECRET);
      const form = {
        user_id: par.id,
        name: req.body.name,
      };
      await PackagesRouter.UpdatePackages(id, form);
      res.status(200).json({ message: "Chỉnh sửa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[DELETE]
  async RemovePackages(req, res) {
    try {
      const id = req.params.id;
      
      await PackagesRouter.DeletePackages(id);
      res.status(200).json({ message: "Xóa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
}
export default new PackagesController();
