import express from "express";
const router = express.Router();
import AccountController from "../controller/AccountController"
// update
router.patch("/:id/update-account", AccountController.UpdateAccount);
//đăng ký
router.post("/register", AccountController.CreateAccount);
// đăng nhập
router.post("/login", AccountController.Login);
// lấy tất cả account
router.get("/get-all-account", AccountController.GetAllAccount);
// lấy 1 tài khoản
router.get("/:id/get-one-account", AccountController.GetOneAccount);

export default router;
