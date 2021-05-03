const Pertanyaan = require("../models/pertanyaan.model");

exports.getName = (req, res) => {
  Pertanyaan.User.getName(req.params.idUser, (err, data) => {
    // console.log(req.params.idSo, data, err);
    if (err) {
      if (err.kind === "no_data") {
        res.status(404).send({
          message: `Not found User with id ${req.params.idUser}.`,
          empty: true,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.idUser,
        });
      }
      //   console.log(err);
    } else {
      res.send(data);
    }
    // console.log(err);
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "isi tidak bisa kosong",
    });
  }
  const dataPertanyaan = new Pertanyaan.listPertanyaan({
    pertanyaan1: req.body.pertanyaan1,
    pertanyaan2: req.body.pertanyaan2,
    pertanyaan3: req.body.pertanyaan3,
  });
  const valueDataPertanyaan = [
    dataPertanyaan.pertanyaan1,
    dataPertanyaan.pertanyaan2,
    dataPertanyaan.pertanyaan3,
  ];
  Pertanyaan.listPertanyaan.create(valueDataPertanyaan, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ada error ketika memasukkan produk",
      });
    } else {
      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "isi tidak bisa kosong",
    });
  }
  const dataID = new Pertanyaan.UpPertanyaan({
    id_listPertanyaan: req.body.id_listPertanyaan,
  });

  Pertanyaan.UpPertanyaan.update(
    dataID,
    req.params.id_cust_handle,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Ada error ketika memasukkan produk",
        });
      } else {
        res.send(data);
      }
    }
  );
};
