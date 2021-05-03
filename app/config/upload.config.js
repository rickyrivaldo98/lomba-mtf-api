const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // if (file.fieldname === "foto_kk") {
    cb(null, "./app/uploads/");
    // }
  },
  filename: function (req, file, cb) {
    // if (file.fieldname === "foto_kk") {
    cb(null, Date.now() + path.extname(file.originalname));
    // }
  },
});

const uploadImg = multer({ storage: storage }).fields([
  { name: "foto_kk", maxCount: 1 },
  { name: "foto_ktp", maxCount: 1 },
  { name: "foto_npwp", maxCount: 1 },
  { name: "foto_stb", maxCount: 1 },
  { name: "foto_slip_gaji", maxCount: 1 },
  { name: "foto_pbb", maxCount: 1 },
  { name: "foto_selfi", maxCount: 1 },
]);

module.exports = { uploadImg };
