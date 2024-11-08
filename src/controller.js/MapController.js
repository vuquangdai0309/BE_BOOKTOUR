import MapModel from "../models/Map";
import Generate from "../middlewares/generate";
import jwt from "jsonwebtoken";
import MapDetailModel from "../models/MapDetail";
class MapController {
  //[GET]
  async GetAll(req, res) {
    try {
      const maps = await MapModel.getAllMap();
      res.status(200).json(maps);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[GET]
  async GetOne(req, res) {
    try {
      const id = req.params.id;
      const maps = await MapModel.getOneMap(id);

      res.status(200).json(maps);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  async GetOneByCoordinates(req, res) {
    try {
      const coordinates = req.params.coordinates;
      const maps = await MapModel.getOneMapByCoordinates(coordinates);
      res.status(200).json(maps);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[POST]
  async CreateMap(req, res) {
    try {
      let imageString = ""
      // nối ảnh thành chuỗi string
      if (req.files["image"] && req.files["image"].length > 0) {
        imageString += req.files["image"].map(item => item.path.replace(/\\/g, '/')).join(",");
      }

      const user_id = req.user_id
      const { name, coordinates, ...mapDetail } = req.body

      const form = {
        code: Generate(8),
        name: name,
        user_id: user_id,
        coordinates: coordinates
      };
      const results = await MapModel.createMap(form);
      const map_id = results.insertId
      const data = {
        logo: req.files["logo"].length > 0 ? req.files["logo"][0].path.replace(/\\/g, '/') : "",
        user_id: user_id,
        image: imageString,
        map_id: map_id,
        ...mapDetail
      }
      await MapDetailModel.CreateMapDetail(data);
      return res.status(201).json({ message: "Thêm bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async UpdateMap(req, res) {
    try {
      const id = req.body.id;


      const { name, coordinates, logo, image, ...mapDetail } = req.body
      const dataMap = {
        name: name,
        coordinates: coordinates
      };
      await MapModel.updateMap(id, dataMap);

      // update mapDetail
      let imageString = ""
      if (req.files["image"] && req.files["image"].length > 0) {
        const imageUrls = req.files["image"].map(url => url.path.replace(/\\/g, '/'))
        if (image) {
          imageUrls.unshift(image)
        }
        const imageUrlString = imageUrls.join(",")
        imageString += imageUrlString
      }
      const newDataMapDetail = {
        logo: req.files["logo"] ? req.files["logo"][0].path.replace(/\\/g, '/') : logo,
        image: imageString ? imageString : image,
        ...mapDetail
      }
      await MapDetailModel.UpdateMapDetail(id, newDataMapDetail)
      res.status(200).json({ message: "Cập nhật bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async DeleteMap(req, res) {
    try {
      const id = req.params.id;
      await MapModel.deleteMap(id);
      res.status(200).json({ message: "Xóa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
}

export default new MapController();
