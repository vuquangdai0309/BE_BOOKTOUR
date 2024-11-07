import express from "express";
import TourController from "../controller.js/TourController";
const router = express.Router();

// xóa bỏ
router.delete("/:id/delete-tour", TourController.RemoveTour);
// tạo mới
router.patch("/:id/update-tour", TourController.UpdateTour);
// tạo mới
router.post("/create-tour", TourController.CreateTour);
// lấy theo point
router.get("/:point/get-one-tour-point", TourController.GetOneTour_ByPoint);
// lấy 1 theo id
router.get("/:id/get-one-tour", TourController.GetOneTour);
// lấy tất cả
router.get("/get-all-tour", TourController.GetAllTour);

export default router;
