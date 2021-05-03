const Tracking = require("../models/tracking.model");

exports.getByid = (req, res) => {
  Tracking.getByid(req.params.id_pengajuan, (err, data) => {
    if (err) {
      if (err.kind === "no_data") {
        res.status(404).send({
          message: `Not found tracking with id ${req.params.id_pengajuan}.`,
          empty: true,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving tracking with id " + req.params.id_pengajuan,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "isi tidak bisa kosong",
    });
  }
  const dataTracking = new Tracking({
    // id_pengajuan: req.body.id_pengajuan,
    isberkasdiproses: req.body.isberkasdiproses,
    ispengajuandiproses: req.body.ispengajuandiproses,
    isisiform: req.body.isisiform,
    isinterview: req.body.isinterview,
    isverifikasi: req.body.isverifikasi,
    isapprove: req.body.isapprove,
    isfinish: req.body.isfinish,
  });

  Tracking.update(dataTracking, req.params.id_pengajuan, (err, data) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res
        .status(400)
        .send({ error: true, message: "Please provide all required field" });
    } else {
      if (err) {
        res.status(500).send({
          message: err.message || "Ada error ketika memasukkan tracking",
        });
      } else {
        res.send(data);
      }
    }
  });
};
