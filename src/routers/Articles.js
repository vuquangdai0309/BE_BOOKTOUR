import express from "express";
import ArticlesController from "../controller/ArticlesController";
import { uploadItem } from "../middlewares/upload";
const router = express.Router();
import checkToken from "../middlewares/checkToken";
//tạo mới
router.delete(
  "/:id/remove-articles",
  checkToken,
  ArticlesController.RemoveArticles
);
//tạo mới
router.patch(
  "/:id/update-articles",
  checkToken,
  uploadItem.single("image"),
  ArticlesController.UpdateArticles
);
//tạo mới
router.post(
  "/create-articles",
  checkToken,
  uploadItem.single("image"),
  ArticlesController.CreateArticles
);

// lấy bài viết theo loại
router.get(
  "/:category/get-one-articles",
  ArticlesController.GetArticles_ByCategory
);
// lấy 1 bài viết theo id
router.get("/:id/get-articles-byId", ArticlesController.GetOneArticles);

// lấy 1 bài viết theo code
router.get(
  "/:code/get-one-articles-code",
  ArticlesController.GetOneArticles_ByCode
);
// lấy tất cả bài viết
router.get("/get-all-articles", ArticlesController.GetAllArticles);
export default router;
