import express from "express";
import CategoryController from "../controller.js/CategoryController";
const router = express.Router();

// xóa
router.delete("/:id/remove-category", CategoryController.RemoveCategory);
// chỉnh sửa
router.patch("/:id/update-category", CategoryController.UpdateCategory);
// thêm mới
router.post("/create-category", CategoryController.CreateCategory);
// lấy 1 loại
router.get("/:id/get-one-category", CategoryController.GetOneCategory);
// lấy tất cả các loại
router.get("/get-all-category", CategoryController.GetAllCategory);
export default router;
