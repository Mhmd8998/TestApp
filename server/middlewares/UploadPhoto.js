const multer = require('multer');
const path = require('path');

// إعداد التخزين باستخدام multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'images')); // تحديد المسار للمجلد "uploads"
  },
  filename: function (req, file, cb) {
    if(file){
      cb(null, Date.now() + path.extname(file.originalname)); // إضافة الطابع الزمني لتجنب التعارض
    }else{
      cb(null,false);
    }
    }
});

// إعداد multer مع الفلاتر (التحقق من نوع الملف وحجمه)
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("unsupported file format"), false); // إرجاع خطأ إذا كان الملف ليس صورة
    }
  },
  limits: { fileSize: 1024 * 1024 * 3 } // الحد الأقصى لحجم الملف 3 ميجابايت
}); // يستقبل صورة واحدة في الحقل "image"

module.exports = upload;
