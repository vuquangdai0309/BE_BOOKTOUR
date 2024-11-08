import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
async function createAndSendPdf(htmlContent, filename, res) {
  let browser;
  try {
    // Khởi động Puppeteer với các tùy chọn không sử dụng sandbox (thường dùng cho môi trường server)
    browser = await puppeteer.launch({
      headless: true, // Không hiển thị UI
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Thêm các tham số cho môi trường server
    });

    const page = await browser.newPage();

    // Thiết lập nội dung HTML cho trang
    await page.setContent(htmlContent);

    // Tạo PDF từ nội dung HTML
    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true, // Chế độ ngang
      printBackground: true, // In background
      margin: {
        bottom: "2cm",
        top: "2cm",
        left: "3cm",
        right: "3cm",
      },
    });

    // Gửi PDF đã tạo về client mà không lưu vào server
    res.contentType("application/pdf"); // Đặt header cho file PDF
    res.send(pdfBuffer); // Gửi buffer PDF trực tiếp về client
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Lỗi khi tạo và gửi PDF:", error);
    res.status(500).send("Lỗi hệ thống");
  } finally {
    // Đảm bảo đóng trình duyệt sau khi xử lý xong
    if (browser) {
      await browser.close();
    }
  }
}
function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
export default { createAndSendPdf, generateRandomString };
