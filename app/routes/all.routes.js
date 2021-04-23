module.exports = (app) => {
  // const costumer = require("../controllers/costumer.controller");
  const costumer = require("../controllers/pengajuan.controller");
  const alamat = require("../controllers/pengajuan.controller");
  const cabangPengajuan = require("../controllers/pengajuan.controller");
  const pengajuanTDP = require("../controllers/pengajuan.controller");
  const pengajuan = require("../controllers/pengajuan.controller");
  const uploadImg = require("../config/upload.config");

  // app.get("/costumer", costumer.getAll);
  app.post(
    "/pengajuantdp",
    uploadImg.uploadImg,
    costumer.create,
    alamat.create,
    cabangPengajuan.create,
    pengajuanTDP.create,
    pengajuan.create
    // pengajuan2.create,
    // pengajuan3.create
  );
};
