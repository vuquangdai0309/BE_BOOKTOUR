
import BookingModel from "../models/Booking";
class BookingController {
  //[GET]
  async GetAllBooking(req, res) {
    try {
      const booking = await BookingModel.GetAllBooking();
      if (booking.length > 0) {
        const bookingMap = new Map();
        booking.forEach((element) => {
          if (!bookingMap.has(element.id)) {
            bookingMap.set(element.id, {
              id: element.id,
              tour_id: element.tour_id,
              packages_id: element.packages_id,
              full_name: element.full_name,
              email: element.email,
              phone: element.phone,
              note: element.note,
              booking_date: element.booking_date,
              name_packages: element.name_packages,
              status: element.status,
              created_at: element.created_at,
              tour: [],
            });
          }
          const getbookingMap = bookingMap.get(element.id);
          getbookingMap.tour.push(element.name_map);
        });
        const data = Array.from(bookingMap.values());
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[GET]
  async GetOneBooking(req, res) {
    try {
      const id = req.params.id;
      const booking = await BookingModel.GetOneBooking(id);
      if (booking.length > 0) {
        const bookingMap = new Map();
        booking.forEach((element) => {
          if (!bookingMap.has(element.id)) {
            bookingMap.set(element.id, {
              id: element.id,
              tour_id: element.tour_id,
              packages_id: element.packages_id,
              full_name: element.full_name,
              email: element.email,
              phone: element.phone,
              note: element.note,
              booking_date: element.booking_date,
              name_packages: element.name_packages,
              tour: [],
            });
          }
          const getbookingMap = bookingMap.get(element.id);
          getbookingMap.tour.push(element.name_map);
        });
        const data = Array.from(bookingMap.values());
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  //[POST]
  async CreateBooking(req, res) {
    try {
      const form = {
        ...req.body,
      };
      await BookingModel.CreateBooking(form);
      return res.status(200).json({ message: "Đã đặt lịch hẹn , chúng tôi sẽ liên hệ cho bạn sớm nhất có thể" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // [PATCH]
  async UpdateBooking(req, res) {
    try {
      const id = req.params.id;
      const form = {
        ...req.body,
      };
      await BookingModel.UpdateBooking(id, form);
      res.status(200).json({ message: "Chỉnh sửa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // cập nhật trạng thái
  async updateStatus(req,res){
    try {
      const id = req.params.id
      const status = req.body.status
      if(!status || status > 2){
        return res.status(500).json({ message: "Có lỗi xảy ra , hiện không cập nhật được trạng thái" });
      }
      await BookingModel.updateStatus(id,status)
      return res.status(203).json({
        message: "Đã cập nhật thành công trạng thái"
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
  // [DELETE]
  async RemoveBooking(req, res) {
    try {
      const id = req.params.id;
      await BookingModel.RemoveBooking(id);
      res.status(200).json({ message: "Xóa bản ghi thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi truy vấn" });
    }
  }
}
export default new BookingController();
