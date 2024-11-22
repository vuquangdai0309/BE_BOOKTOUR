import express from "express";
import ViewmapController from "../controller/ViewmapController";
const router = express.Router();
import checkToken from "../middlewares/checkToken";
// thay đổi hiển thị
router.post("/create-viewmap", checkToken, ViewmapController.CreateViewmap);
// hiển thị bản đồ
router.get("/get-one-viewmap", checkToken, ViewmapController.GetOneViewmap);
export default router;
