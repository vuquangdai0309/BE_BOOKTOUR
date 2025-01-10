import MyInfoModel from "../models/MyInfo";

class MyInfoController {
    async getMyInfo(req, res) {
        try {
            const results = await MyInfoModel.GetMyInfo()
            return res.status(200).json(results)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Lỗi truy vấn" });
        }
    }
    // update
    async updateMyInfo(req, res) {
        try {
            const form = {
                ...req.body,
                logo: req.file ? req.file.path : req.body.logo,
            };
            console.log(`form:`,form)
            await MyInfoModel.updateMyInfo(form._id, form)
            return res.status(200).json({
                message: "Cập nhật thành công"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Lỗi truy vấn" });
        }
    }
}

export default new MyInfoController();
