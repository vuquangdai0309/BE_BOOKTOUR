import jwt from "jsonwebtoken";
import AccountModel from "../models/Account";
const checkToken = async (req, res, next) => {
  try {
    let token = req.cookies[process.env.COOKIE];
    if (!token) {
      return res.status(400).json({
        message: "Bạn cần phải đăng nhập",
      });
    }
    let par = jwt.verify(token, process.env.SECRET);
    if (!par) {
      return res.status(400).json({
        message: "Token không hợp lệ",
      });
    }
    const getOneUser = await AccountModel.GetOneAccount(par.id)
    console.log(getOneUser)
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Lỗi middleware checkToken",
    });
  }
};

export default checkToken;
