import multer from "multer";
import iconv from "iconv-lite";
//multer

const storageAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatar");
  },
  filename: (req, file, cb) => {
    const originalname = iconv.decode(
      Buffer.from(Date.now() + "-" + file.originalname, "binary"),
      "utf-8"
    );
    cb(null, originalname);
  },
});
var uploadAvatar = multer({ storage: storageAvatar });
const storageItem = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/item");
  },
  filename: (req, file, cb) => {
    const originalname = iconv.decode(
      Buffer.from(Date.now() + "-" + file.originalname, "binary"),
      "utf-8"
    );
    cb(null, originalname);
  },
});
var uploadItem = multer({ storage: storageItem });

export { uploadAvatar, uploadItem };
