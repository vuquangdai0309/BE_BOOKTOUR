import MapModel from "../models/Map";
import Generate from "../middlewares/generate";
import QRCode from "qrcode";
class MapController {
  //[GET]
  async GetAllPage(req, res) {
    try {
      const { searchName, page = 1 } = req.query;
      const pageSize = 12; // Kích thước trang
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const maps = await MapModel.getAllMapPage(searchName);
      const totalRecords = maps.length; // Tổng số bản ghi
      const totalPages = Math.ceil(totalRecords / pageSize);
      const pages = Array.from({ length: totalPages }, (_, index) => {
        return {
          number: index + 1,
          active: index + 1 === page,
          isDots: index + 1 > 5,
        };
      });
      const paginatedData = maps.slice(startIndex, endIndex);
      const views = {
        results: paginatedData,
        pagination: {
          prev: page > 1 ? page - 1 : null,
          next: endIndex < totalRecords ? page + 1 : null,
          pages: pages,
          totalPages: totalPages,
          pageSize: pageSize,
          totalRecords: totalRecords // Thêm tổng số bản ghi
        },
      };

      return res.status(200).json(views);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[GET]
  async GetAll(req, res) {
    try {
      const {searchName} = req.query
      const maps = await MapModel.getAllMap(searchName);
      return res.status(200).json(maps);
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
        image: imageString,
        logo:
          req.files["logo"].length > 0
            ? req.files["logo"][0].path.replace(/\\/g, "/")
            : "",
        ...mapDetail
      };
    
      await MapModel.createMap(form);
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
      const dataMap = {
        name: name,
        coordinates: coordinates,
        logo: req.files["logo"] ? req.files["logo"][0].path.replace(/\\/g, '/') : logo,
        image: imageString ? imageString : image,
        ...mapDetail
      };
      await MapModel.updateMap(id, dataMap);
      return res.status(200).json({ message: "Cập nhật bản ghi thành công" });
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
      const qrCodeData = `${process.env.LINK_FRONDEND}/checkQr/${map[0].coordinates}`;
      const qrCodeBuffer = await QRCode.toBuffer(qrCodeData);
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>QR Code PDF</title>
    <style>
        body, html {
            height: 100%;
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .container {
            background: #ffffff;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 100%;
            max-width: 600px;
        }

        .qr-code-wrapper {
            display: inline-block;
            padding: 20px;
            background: #e9f5e1;
            border: 2px solid #166335;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        .qr-code-wrapper:hover {
            transform: scale(1.05);
            transition: transform 0.3s ease;
        }

        .img-qr {
            width: 250px;
            height: 250px;
            object-fit: cover;
            border-radius: 10px;
        }

        .title {
            font-size: 24px;
            color: #166335;
            margin-top: 15px;
            font-weight: 600;
        }

        @media print {
            body, html {
                background-color: #ffffff;
            }
            .container {
                box-shadow: none;
                border: none;
            }
            .qr-code-wrapper {
                box-shadow: none;
                border: 2px solid #166335;
                background: #ffffff;
            }
        }
    </style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <div class="qr-code-wrapper">
            <img src="data:image/png;base64,${qrCodeBuffer.toString("base64")}" class="img-qr" alt="QR Code">
        </div>
        <p class="title">${map[0].name}</p>
    </div>
</body>
</html>
`;

      await getcreateAndSendPdf(htmlContent, filename, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Lỗi truy vấn" });
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
