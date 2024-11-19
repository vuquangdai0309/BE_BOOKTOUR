import MapModel from "../models/Map";
import Generate from "../middlewares/generate";
import QRCode from "qrcode";
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
  //[POST]
  async CreateMap(req, res) {
    try {
      let imageString = "";
      // nối ảnh thành chuỗi string
      if (req.files["image"] && req.files["image"].length > 0) {
        imageString += req.files["image"]
          .map((item) => item.path.replace(/\\/g, "/"))
          .join(",");
      }

      const user_id = req.user_id;
      const { name, coordinates, ...mapDetail } = req.body;

      const form = {
        code: Generate.generateRandomString(8),
        name: name,
        user_id: user_id,
        coordinates: coordinates,
      };
      const results = await MapModel.createMap(form);
      const map_id = results.insertId;

      const data = {
        logo:
          req.files["logo"].length > 0
            ? req.files["logo"][0].path.replace(/\\/g, "/")
            : "",
        user_id: user_id,
        image: imageString,
        map_id: map_id,
        ...mapDetail,
      };
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

      const { name, coordinates, logo, image, ...mapDetail } = req.body;
      const dataMap = {
        name: name,
        coordinates: coordinates,
      };
      await MapModel.updateMap(id, dataMap);

      // update mapDetail
      let imageString = "";
      if (req.files["image"] && req.files["image"].length > 0) {
        const imageUrls = req.files["image"].map((url) =>
          url.path.replace(/\\/g, "/")
        );
        if (image) {
          imageUrls.unshift(image);
        }
        const imageUrlString = imageUrls.join(",");
        imageString += imageUrlString;
      }
      const newDataMapDetail = {
        logo: req.files["logo"]
          ? req.files["logo"][0].path.replace(/\\/g, "/")
          : logo,
        image: imageString ? imageString : image,
        ...mapDetail,
      };
      await MapDetailModel.UpdateMapDetail(id, newDataMapDetail);
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
  //[GET]
  async GenerateQr(req, res) {
    try {
      const getcreateAndSendPdf = Generate.createAndSendPdf;
      const code = req.params.code;
      const map = await MapModel.getOneMap_ByCode(code);
      const filename = `QR_${map[0].code}.pdf`;
      const qrCodeData = `${process.env.LINK}/map-search?code=${map[0].code}`;
      const qrCodeBuffer = await QRCode.toBuffer(qrCodeData);
      const htmlContent = `
  <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Document</title>
          <style>
              body,
              html {
                  height: 100%;
                  margin: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }
      
              .selector-for-some-widget {
                  box-sizing: content-box;
              }
      
              h1,
              h3,
              p,
              span,
              strong {
                  color: #166335 !important;
              }
              html {
                  font-family: 'Times New Roman', Times, serif !important;
                  height: 100vh;
                  width: 100%;
              }
      
              body {
                  width: 100%;
              }
      
              .background {
                  width: 100%;
                  height: 100%;
                  position: relative;
                  justify-content: center;
                  text-align: center;
              }
      
              .img_background {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  display: flex;
                  align-items: center;
                  justify-content: center;
              }
      
      
              .content {
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  padding: 0 75px;
              }
      
              .content_left {
                  text-align: center;
                  padding: 0 0 0 29px !important;
              }
      
              .content_left-logo {
                  width: 300px;
                  height: 200px;
                  object-fit: contain;
      
              }
      
              .content_left-address {
                  font-size: 24px;
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 28px;
                  margin-top: 10px;
                  letter-spacing: -1px;
              }
      
              .content_left-title {
                  font-size: 24px;
                  line-height: 28px;
                  display: inline-block;
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  flex: 1;
                  margin-top: auto;
              }
              .content_right {
                  height: 300px;
                  border-radius: 20px;
                  padding-top: 20px;
                  text-align: center;
              }
      
              .content_right-qr {
                  margin-top: 30px;
                  border-radius: 20px;
                  width: 250px;
                  height: 250px;
                  margin: auto;
                  background-color: rgb(255, 254, 254);
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }
      
              .img-qr {
                  width: 230px;
                  height: 230px;
                  object-fit: cover;
              }
      
              .content_right-title {
                  font-weight: 600;
                  font-size: 24px;
                  margin: 12px 0;
                  font-style: italic;
                  letter-spacing: 1px;
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              }
      
              .container-creat {
                  width: 1000px;
                  height: 500px;
                  margin: 0 auto;
              }
          </style>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
      </head>     
      <body>
          <div class="container-creat background ">
              <div class="content row">                
                  <div class="content_right col-sm-5">                   
                      <div class="content_right-qr">
                          <img src="data:image/png;base64,${qrCodeBuffer.toString(
                            "base64"
                          )}" class="img-qr">
                      </div>
                      <p class="content_right-title">${map[0].name}</p>
                  </div>
              </div>
          </div>
      </body>
    </html>
      `;
      await getcreateAndSendPdf(htmlContent, filename, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[GET]
  async GetMapSearch(req, res) {
    try {
      const code = req.query.code;
      const map = await MapModel.getOneMap_ByCode(code);
      res.status(200).json(map);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
}

export default new MapController();
