import express from "express";
import CategoryController from "../controller/CategoryController";
import checkToken from "../middlewares/checkToken";
const router = express.Router();
import checkToken from "../middlewares/checkToken";
// xóa
router.delete(
  "/:id/remove-category",
  checkToken,
  CategoryController.RemoveCategory
);
// chỉnh sửa
router.patch(
  "/:id/update-category",
  checkToken,
  CategoryController.UpdateCategory
);
// thêm mới
router.post("/create-category", checkToken, CategoryController.CreateCategory);
// lấy 1 loại
router.get("/:id/get-one-category", CategoryController.GetOneCategory);
// lấy tất cả các loại
router.get("/get-all-category", CategoryController.GetAllCategory);
export default router;
