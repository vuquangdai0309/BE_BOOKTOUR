import express from "express";
import MapController from "../controller.js/MapController";
import checkToken from "../middlewares/checkToken";
const router = express.Router();
// xóa
router.patch("/:id/delete-map", MapController.DeleteMap);
// tạo map
router.post("/create-map",checkToken, MapController.CreateMap);
// lấy các địa điểm
router.get("/get-all-map", MapController.GetAll);
// lấy 1 điểm
router.get("/:id/get-one-map", MapController.GetOne);

export default router;
