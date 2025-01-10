import express from "express";
const myInfoRouter = express.Router();
import checkToken from "../middlewares/checkToken";
import { uploadItem } from "../middlewares/upload";
import MyInfoController from "../controller/MyInfoController";

// xóa
myInfoRouter.get("/myinfo/get",  MyInfoController.getMyInfo);
myInfoRouter.patch("/myinfo/updateById", uploadItem.single("logo"), checkToken, MyInfoController.updateMyInfo);

export default myInfoRouter;
