
import ServiceModel from "../models/Service";
class ServiceController {
  //[GET]
  async GetAllService(req, res) {
    try {
      const data = await ServiceModel.GetAllService();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }

  //[GET]
  async GetOneService(req, res) {
    try {
      const id = req.params.id;
      const data = await ServiceModel.GetOneService(id);
      res.status(200).json(data[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }

  //[POST]
  async CreateService(req, res) {
    try {
      console.log( req.file)
      const form = {
        ...req.body,
        image: req.file.path,
      };
      await ServiceModel.CreateService(form);
      res.status(200).json({ message: "Thêm bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async UpdateService(req, res) {
    try {
      const id = req.body.id;
      
      const form = {
        ...req.body,
        image: req.file ? req.file.path : req.body.image,
      };
      
      await ServiceModel.UpdateService(id, form);
      res.status(200).json({ message: "Chỉnh sửa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[DELETE]
  async RemoveService(req, res) {
    try {
      const id = req.params.id;
      await ServiceModel.RemoveService(id);
      res.status(200).json({ message: "Xóa sửa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
}

export default new ServiceController();
