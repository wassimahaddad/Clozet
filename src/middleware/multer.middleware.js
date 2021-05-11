const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 3150000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      return cb(new Error("File must be a JPG or PNG image"));
    }
    cb(undefined, true);
  },
});

module.exports = { upload };
