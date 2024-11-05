import CategoryModel from "../models/Category";
import jwt from "jsonwebtoken";
class CategoryController {
  //[GET]
  async GetAllCategory(req, res) {
    try {
      const categories = await CategoryModel.GetAllCategory();
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[GET]
  async GetOneCategory(req, res) {
    try {
      const id = req.params.id;
      const categories = await CategoryModel.GetOneCategory(id);
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[POST]
  async CreateCategory(req, res) {
    try {
      const user_id = req.user_id
      const form = {
        user_id: user_id,
        name: req.body.name,
      };
      await CategoryModel.CreateCategory(form);
      res.status(200).json({ message: "Thêm bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async UpdateCategory(req, res) {
    try {
      const id = req.params.id;
      const form = {
        name: req.body.name,
        active:  req.body.active
      };
      await CategoryModel.UpdateCategory(id, form);
      res.status(200).json({ message: "Chỉnh sửa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async RemoveCategory(req, res) {
    try {
      const id = req.params.id;
      await CategoryModel.RemoveCategory(id);
      res.status(200).json({ message: "Xóa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
}
export default new CategoryController();
