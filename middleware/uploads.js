const multer = require("multer");

// Purpose of this file is for image validation and uploading images to our server
// valid image types
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // check if the image type is valid or not by comparing it's type with our other types (defined above)
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid Image Type");
    if (isValid) uploadError = null;
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(" ", "-");
    const extention = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extention}`);
  },
});
const uploadOptions = multer({ storage: storage });

module.exports = uploadOptions;
