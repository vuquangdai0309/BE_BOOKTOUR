import express from "express";
import PackagesController from "../controller.js/PackagesController";
const router = express.Router();

// xóa
router.delete("/:id/remove-packages", PackagesController.RemovePackages);
// chỉnh sửa
router.patch("/:id/update-packages", PackagesController.UpdatePackages);
// tạo mới
router.post("/create-packages", PackagesController.CreatePackages);
// lấy 1
router.get("/:id/get-one-packages", PackagesController.GetOnePackages);
// lấy tất cả
router.get("/get-all-packages", PackagesController.GetAllPackages);

export default router;
