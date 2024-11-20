
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
      res.status(200).json(packages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[POST]
  async CreatePackages(req, res) {
    try {
      const user_id = req.user_id
      const form = {
        user_id: user_id,
        ...req.body
      };
      await PackagesRouter.CreatePackages(form);
      res.status(200).json({ message: "Thêm thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async UpdatePackages(req, res) {
    try {
      const id = req.params.id;
      await PackagesRouter.UpdatePackages(id, req.body);
      res.status(200).json({ message: "Chỉnh sửa thành công" });
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
      res.status(500).json({ message: "Không thể xóa bản ghi này!" });
    }
  }
}
export default new PackagesController();
