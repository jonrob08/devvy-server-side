// Multer is middleware that handles multipart/form-data, which is just form data that gets sent to the server in multiple parts due to it's large size. This ENCTYPE is primarily used for uploading files and photos. Multer adds a 'body' object and a 'file' or 'files' object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
const multer = require("multer");

// Image validation and uploading images to our server
// Valid image types
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
