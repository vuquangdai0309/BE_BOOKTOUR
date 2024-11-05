import AccountModel from "../models/Account";
import Generate from "../middlewares/generate";
import jwt from "jsonwebtoken";
class AccountController {
  // [GET]
  async GetAllAccount(req, res) {
    try {
      const accounts = await AccountModel.GetAllAccount();
      res.status(200).json(accounts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // [GET]
  async GetOneAccount(req, res) {
    try {
      const id = req.params.id;
      const accounts = await AccountModel.GetOneAccount(id);
      res.status(200).json(accounts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // [POST]
  async Login(req, res) {
    try {
      const user_name = req.body.user_name;
      const password = req.body.password;
      const accounts = await AccountModel.LoginAccount(user_name, password);
      if (accounts.length > 0) {
        const data = accounts[0];
        const token = jwt.sign(
          {
            id: data.id,
          },
          process.env.SECRET
        );
        res.cookie(process.env.COOKIE, token, {
          httpOnly: true,
          maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
        });
        res.json({
          message: "Đăng nhập thành công",
          token: token,
          full_name: data.full_name,
          avatar: data.avatar,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // [POST]
  async CreateAccount(req, res) {
    try {
      // kiểm tra tk tồn tại
      const email = req.body.email;
      const user_name = req.body.user_name;
      const getOne = await AccountModel.GetAccount_ByEmailAndUserName(
        email,
        user_name
      );
      if (getOne.length > 0) {
        res.status(302).json({ message: "Tài khoản đã tồn tại" });
      } else {
        const form = {
          code: Generate(8),
          ...req.body,
        };
        await AccountModel.CreatedAccount(form);
        res.status(200).json({ message: "Đăng ký tài khoản thành công" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // [PATCH]
  async UpdateAccount(req, res) {
    try {
      const id = req.params.id;
      const email = req.body.email;
      const user_name = req.body.user_name;
      const getOne = await AccountModel.GetAccount_ByEmailAndUserName(
        email,
        user_name
      );
      if (getOne.length > 0) {
        res.status(302).json({ message: "Tài khoản đã tồn tại" });
      } else {
        const form = {
          ...req.body,
        };
        await AccountModel.UpdatedAccount(id, form);
        res.status(200).json({ message: "Chỉnh sửa bản ghi thành công" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // [DELETE]
  async DeleteAccount(req, res) {
    try {
      const id = req.params.id;
      await AccountModel.RemoveAccount(id);
      res.status(200).json({ message: "Xóa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
}
export default new AccountController();
