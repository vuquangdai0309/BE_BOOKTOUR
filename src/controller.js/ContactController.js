import { message } from "antd";
import ContactModel from "../models/Contact";
import jwt from "jsonwebtoken";
class ContactController {
  //[GET]
  async GetAllContact(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; // Trang hiện tại
      const pageSize = 12; // Kích thước trang
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const search = req.query.search || "";
      const data = await ContactModel.GetAllContact(search);
      const totalPages = Math.ceil(data.length / pageSize);
      const pages = Array.from({ length: totalPages }, (_, index) => {
        return {
          number: index + 1,
          active: index + 1 === page,
          isDots: index + 1 > 5,
        };
      });
      const paginatedData = data.slice(startIndex, endIndex);
      const views = {
        results: paginatedData,
        pagination: {
          prev: page > 1 ? page - 1 : null,
          next: endIndex < data.length ? page + 1 : null,
          pages: pages,
        },
      };
      res.status(200).json(views);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[GET]
  async GetOneContact(req, res) {
    try {
      const id = req.params.id;
      const data = await ContactModel.GetOneContact(id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[POST]
  async CreateContact(req, res) {
    try {
      const form = {
        ...req.body,
      };
      await ContactModel.CreateContact(form);
      res.status(200).json({ message: "Gửi thông tin thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[PATCH]
  async ChangeStatusContact(req, res) {
    try {
      const id = req.params.id;
      const status = req.body.status;
      await ContactModel.ChangeStatusContact(id, status);
      res.status(200).json({ message: "Thay đổi trạng thái thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[DELETE]
  async RemoveContact(req, res) {
    try {
      const id = req.params.id;
      await ContactModel.RemoveContact(id);
      res.status(200).json({ message: "Xóa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
}
export default new ContactController();