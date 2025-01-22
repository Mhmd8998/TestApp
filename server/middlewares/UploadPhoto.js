const fs = require("fs");
const path = require("path");
const multer = require("multer");

const imagesDir = path.join(__dirname, 'images');

// التأكد من وجود المجلد "images"، وإذا لم يكن موجودًا، يتم إنشاؤه
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // إضافة الطابع الزمني لتجنب التعارض
  }
});
const upload = multer({ storage: storage });
module.exports = upload;


/*
const photoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images'));
  },
  filename: function (req, file, cb) {
    if (file) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    } else {
      cb(null, false);
    }
  }
});

const photoUpload = multer({
  storage: photoStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "unsupported file format" }, false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 3 } // الحد الأقصى لحجم الملف 3 ميجابايت
});

module.exports = photoUpload;
*/
