import express from "express";
const routerBanner = express.Router();
import checkToken from "../middlewares/checkToken";
import { uploadItem } from "../middlewares/upload";
import BannerController from "../controller/BannerController";

// xóa
routerBanner.get("/banner/get",checkToken,BannerController.getBanner);
routerBanner.patch("/banner/updateById",uploadItem.single("image"),checkToken,BannerController.updateBanner);

export default routerBanner;
