import express from "express";
import PackagesController from "../controller.js/PackagesController";
const router = express.Router();
import checkToken from "../middlewares/checkToken";
// xóa
router.delete(
  "/:id/remove-packages",
  checkToken,
  PackagesController.RemovePackages
);
// chỉnh sửa
router.patch(
  "/:id/update-packages",
  checkToken,
  PackagesController.UpdatePackages
);
// tạo mới
router.post("/create-packages", checkToken, PackagesController.CreatePackages);
// lấy 1
router.get("/:id/get-one-packages", PackagesController.GetOnePackages);
// lấy tất cả
router.get("/get-all-packages", PackagesController.GetAllPackages);

export default router;
