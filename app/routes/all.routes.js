module.exports = (app) => {
  // const costumer = require("../controllers/costumer.controller");
  const user = require("../controllers/pertanyaan.controller");
  const listPertanyaan = require("../controllers/pertanyaan.controller");
  const UpPertanyaan = require("../controllers/pertanyaan.controller");
  const UpJawaban = require("../controllers/pertanyaan.controller");

  const costumer = require("../controllers/pengajuan.controller");
  const alamat = require("../controllers/pengajuan.controller");
  const cabangPengajuan = require("../controllers/pengajuan.controller");
  const LinkMeet = require("../controllers/pengajuan.controller");
  const Cust_handle = require("../controllers/pengajuan.controller");

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
  app.get("/linkmeet/:id_cust_handle", LinkMeet.getLink);
  app.get("/cust_handle/:id_cust_handle", Cust_handle.getByID);
  app.put("/cust_handle/:id_cust_handle", Cust_handle.Update);

  app.get("/pertanyaan/:idUser", user.getName);
  app.post("/pertanyaan", listPertanyaan.create);
  app.put("/pertanyaan/:id_cust_handle", UpPertanyaan.update);
  app.put("/jawaban/:id_cust_handle", UpJawaban.updateJawaban);
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
