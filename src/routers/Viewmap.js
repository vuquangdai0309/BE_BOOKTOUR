import express from "express";
import ViewmapController from "../controller.js/ViewmapController";
const router = express.Router();

// thay đổi hiển thị
router.post("/create-viewmap", ViewmapController.CreateViewmap);
// hiển thị bản đồ
router.get("/get-one-viewmap", ViewmapController.GetOneViewmap);
export default router;
