module.exports = (app) => {
  // const costumer = require("../controllers/costumer.controller");
  const user = require("../controllers/pertanyaan.controller");
  const listPertanyaan = require("../controllers/pertanyaan.controller");
  const UpPertanyaan = require("../controllers/pertanyaan.controller");
  const costumer = require("../controllers/pengajuan.controller");
  const alamat = require("../controllers/pengajuan.controller");
  const cabangPengajuan = require("../controllers/pengajuan.controller");
  const pengajuanTDP = require("../controllers/pengajuan.controller");
  const pengajuan = require("../controllers/pengajuan.controller");
  const InsertTracking = require("../controllers/pengajuan.controller");
  const InsertCustHandle = require("../controllers/pengajuan.controller");
  const InsertPertanyaan = require("../controllers/pengajuan.controller");
  const uploadImg = require("../config/upload.config");
  const tracking = require("../controllers/tracking.controller");

  // app.get("/costumer", costumer.getAll);
  app.post(
    "/pengajuan",
    uploadImg.uploadImg,
    costumer.create,
    alamat.create,
    cabangPengajuan.create,
    pengajuanTDP.create,
    pengajuan.create,
    InsertTracking.create,
    InsertCustHandle.create,
    InsertPertanyaan.create
    // pengajuan2.create,
    // pengajuan3.create
  );

  app.get("/costumer", costumer.getAll);
  app.get("/costumer/:id_costumer", costumer.getById_costumer);

  app.get("/pertanyaan/:idUser", user.getName);
  app.post("/pertanyaan", listPertanyaan.create);
  app.put("/pertanyaan/:id_cust_handle", UpPertanyaan.update);
  app.get("/dummy", (req, res) => {
    res.json({
      status: "success",
      ocr: true,
      dukcapil: true,
      face_rec: true,
      slik: true,
      message: "Data Valid",
    });
  });

  app.put("/tracking/:id_pengajuan", tracking.update);
  app.get("/tracking/:id_pengajuan", tracking.getByid);
};
