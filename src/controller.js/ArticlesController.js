import Generate from "../middlewares/generate";
import ArticlesModel from "../models/Articles";
import jwt from "jsonwebtoken";
class AccountController {
  //[GET]
  async GetAllArticles(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; // Trang hiện tại
      const pageSize = 12; // Kích thước trang
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const search = req.query.search || "";
      const data = await ArticlesModel.GetAllArticles(search);
      const totalPages = Math.ceil(data.length / pageSize);
      const pages = Array.from({ length: totalPages }, (_, index) => {
        return {
          number: index + 1,
          active: index + 1 === page,
          isDots: index + 1 > 5,
        };
      });
      const paginatedData = data.slice(startIndex, endIndex);
      const views = {
        articles: paginatedData,
        pagination: {
          prev: page > 1 ? page - 1 : null,
          next: endIndex < data.length ? page + 1 : null,
          pages: pages,
        },
      };
      res.status(200).json(views);
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
      return res.status(200).json(articles);
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
      if (articles.length === 0) {
        return res.status(500).json({ message: "Hiện không có bài viết nào" });
      }
      return res.status(200).json(articles);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[POST]
  async CreateArticles(req, res) {
    try {
      const user_id = req.user_id;
      const imagePath = req.file ? req.file.path : "";
      const form = {
        user_id: user_id,
        code: Generate.generateRandomString(8),
        image: imagePath,
        ...req.body,
      };

      if (Number(req.body.category_id) === 1) {
        const getArticleByCategoryId =
          await ArticlesModel.GetOneArticles_ByCategory(req.body.category_id);
        if (getArticleByCategoryId) {
          const GetOneArticles = getArticleByCategoryId[0];
          await ArticlesModel.UpdateArticles(GetOneArticles.id, form);
        }
      } else {
        await ArticlesModel.CreateArticles(form);
      }
      return res.status(200).json({ message: "Thêm bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async UpdateArticles(req, res) {
    try {
      const id = req.body.id;
      var imagePath = req.file ? req.file.path : req.body.image;
      const form = {
        image: imagePath,
        ...req.body,
      };
      await ArticlesModel.UpdateArticles(id, form);
      return res.status(200).json({ message: "Chỉnh sửa bản ghi thành công" });
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
