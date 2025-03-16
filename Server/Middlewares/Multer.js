const multer = require("multer")

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //   cb(null, './uploads'); // Directory where files will be saved
    // },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    }
  });

// Initialize upload middleware
const upload = multer({ storage });

module.exports = upload