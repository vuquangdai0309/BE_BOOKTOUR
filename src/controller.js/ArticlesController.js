import Generate from "../middlewares/generate";
import ArticlesModel from "../models/Articles";
import jwt from "jsonwebtoken";
class AccountController {
  //[GET]
  async GetAllArticles(req, res) {
    try {
      const articles = await ArticlesModel.GetAllArticles();
      res.status(200).json(articles);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[GET]
  async GetOneArticles(req, res) {
    try {
      const id = req.params.id;
      const articles = await ArticlesModel.GetOneArticles(id);
      res.status(200).json({ articles: articles[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[GET]
  async GetOneArticles_ByCode(req, res) {
    try {
      const code = req.params.code;
      const articles = await ArticlesModel.GetOneArticles_ByCode(code);
      res.status(200).json({ articles: articles[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[GET]
  async GetArticles_ByCategory(req, res) {
    try {
      const category = req.params.category;
      const articles = await ArticlesModel.GetOneArticles_ByCategory(category);
      res.status(200).json(articles);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[POST]
  async CreateArticles(req, res) {
    try {
      let token = req.cookies[process.env.COOKIE];
      let par = jwt.verify(token, process.env.SECRET);
      const imagePath = req.file.path;
      const form = {
        user_id: par.id,
        code: Generate(8),
        image: imagePath,
        ...req.body,
      };
      await ArticlesModel.CreateArticles(form);
      res.status(200).json({ message: "Thêm bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async UpdateArticles(req, res) {
    try {
      const id = req.params.id;
      var imagePath = req.body.image;
      if (req.file) {
        imagePath = req.file.path;
      }
      const form = {
        image: imagePath,
        ...req.body,
      };
      await ArticlesModel.UpdateArticles(id, form);
      res.status(200).json({ message: "Chỉnh sửa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[DELETE]
  async RemoveArticles(req, res) {
    try {
      const id = req.params.id;
      await ArticlesModel.RemoveArticles(id);
      res.status(200).json({ message: " Xóa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
}
export default new AccountController();
