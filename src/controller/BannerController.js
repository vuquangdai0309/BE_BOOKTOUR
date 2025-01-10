import BannerModel from "../models/Banner";

class BannerController {
    async getBanner(req, res) {
        try {
            const results = await BannerModel.GetBanner()
            return res.status(200).json(results)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Lỗi truy vấn" });
        }
    }
    // update
    async updateBanner(req, res) {
        try {
            const form = {
                ...req.body,
                image: req.file ? req.file.path : req.body.image,
            };
            await BannerModel.updateBanner(form._id, form)
            return res.status(200).json({
                message: "Cập nhật thành công"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Lỗi truy vấn" });
        }
    }
}

export default new BannerController();
