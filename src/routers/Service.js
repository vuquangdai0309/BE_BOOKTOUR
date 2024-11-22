import express from "express";
import ServiceController from "../controller/ServiceController";
const router = express.Router();
import checkToken from "../middlewares/checkToken";
import { uploadItem } from "../middlewares/upload";

// xóa
router.delete(
  "/:id/remove-service",
  checkToken,
  ServiceController.RemoveService
);
// chỉnh sửa
router.patch(
  "/:id/update-service",
  checkToken,
  uploadItem.single("image"),
  ServiceController.UpdateService
);

// thêm
router.post(
  "/create-service",
  checkToken,
  uploadItem.single("image"),
  ServiceController.CreateService
);
// lấy 1
router.get("/:id/get-one-service", ServiceController.GetOneService);
// lấy tất cả
router.get("/get-all-service", ServiceController.GetAllService);
export default router;
