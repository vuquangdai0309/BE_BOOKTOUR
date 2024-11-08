import express from "express";
import MapController from "../controller.js/MapController";
import checkToken from "../middlewares/checkToken";
import { uploadItem } from "../middlewares/upload";
const router = express.Router();
// xóa
router.patch("/:id/delete-map", MapController.DeleteMap);
// tạo map
router.post("/create-map",checkToken, uploadItem.fields([{ name: "image" }, { name: "logo" }]), MapController.CreateMap);
// update
router.patch("/update-map",checkToken, uploadItem.fields([{ name: "image" }, { name: "logo" }]), MapController.UpdateMap);
// lấy các địa điểm
router.get("/get-all-map", MapController.GetAll);
// lấy 1 điểm
router.get("/:id/get-one-map", MapController.GetOne);
// lay mapp theo toa do
router.get("/get-map-by-coordinates/:coordinates", MapController.GetOneByCoordinates);

export default router;
