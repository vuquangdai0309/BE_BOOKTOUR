import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
async function createAndSendPdf(htmlContent, filename, res) {
  let browser;
    try {
        console.log("Bắt đầu tạo PDF...");
        browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        console.log("Nội dung HTML đã được thiết lập.");

        const pdfBuffer = await page.pdf({
            format: "A4",
            landscape: true,
            printBackground: true,
            margin: {
                bottom: "2cm",
                top: "2cm",
                left: "3cm",
                right: "3cm",
            },
        });
        console.log("PDF đã được tạo.");

        await page.close();

        // Thiết lập header đúng cách
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename}.pdf"`,
            'Content-Length': pdfBuffer.length,
            'Content-Encoding': 'identity', // Đảm bảo không nén lại dữ liệu
        });

        res.status(200).end(pdfBuffer, 'binary'); // Sử dụng res.end thay vì res.send
        console.log("PDF đã được gửi về client.");
    } catch (error) {
        console.error("Lỗi khi tạo và gửi PDF:", error);
        res.status(500).json({ message: "Lỗi hệ thống khi tạo PDF." });
    } finally {
        if (browser) {
            await browser.close();
            console.log("Trình duyệt Puppeteer đã đóng.");
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
