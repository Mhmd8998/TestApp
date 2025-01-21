const path = require("path");
const multer = require("multer");

const photoStorage = multer.diskStorage({
  destination: function (req, file, cb) { // تصحيح 'distination' إلى 'destination'
    cb(null, path.join(__dirname, '../images'));
  },
  filename: function (req, file, cb) { // تصحيح 'fumction' إلى 'function'
    if (file) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // تصحيح 'Data' إلى 'Date' وإصلاح التعبير العادي
    } else {
      cb(null, false);
    }
  }
});

const photoUpload = multer({
  storage: photoStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image")) { // تصحيح 'startWith' إلى 'startsWith'
      cb(null, true);
    } else {
      cb({ message: "unsupported file format" }, false); // تصحيح 'unsuported' إلى 'unsupported'
    }
  },
  limits: { fileSize: 1024 * 1024 * 3 } // تصحيح 'filesize' إلى 'fileSize'
});

module.exports = photoUpload; // تصحيح 'moudle' إلى 'module'
