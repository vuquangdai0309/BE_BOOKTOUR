import express from "express";
import ContactController from "../controller.js/ContactController";
import checkToken from "../middlewares/checkToken";
const router = express.Router();
import checkToken from "../middlewares/checkToken";
// xóa
router.delete(
  "/:id/remove-contact",
  checkToken,
  ContactController.RemoveContact
);
router.patch(
  "/:id/change-status-contact",
  checkToken,
  ContactController.ChangeStatusContact
);
// thêm mới
router.post("/create-contact", checkToken, ContactController.CreateContact);
// lấy 1 loại
router.get("/:id/get-one-contact", ContactController.GetOneContact);
// lấy tất cả các loại
router.get("/get-all-contact", ContactController.GetAllContact);
export default router;
