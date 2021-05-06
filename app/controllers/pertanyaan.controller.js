const Pertanyaan = require("../models/pertanyaan.model");

exports.getAll = (req, res) => {
  Pertanyaan.User2.getAll((err, data) => {
    // console.log(req.params.idSo, data, err);
    if (err) {
      if (err.kind === "no_data") {
        res.status(404).send({
          message: `Not found `,
          empty: true,
        });
      } else {
        res.status(500).send({
          message: "Error  ",
        });
      }
      //   console.log(err);
    } else {
      res.send(data);
    }
    // console.log(err);
  });
};

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

exports.updateJawaban = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "isi tidak bisa kosong",
    });
  }
  const dataJawaban = new Pertanyaan.UpJawaban({
    jawaban1: req.body.jawaban1,
    jawaban2: req.body.jawaban2,
    jawaban3: req.body.jawaban3,
  });

  const dataTgl = new Pertanyaan.Uptgl({
    tgl_meet: req.body.tgl_meet,
  });

  Pertanyaan.UpJawaban.updateJawaban(
    dataJawaban,
    req.params.id_cust_handle,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Ada error ketika memasukkan produk",
        });
      } else {
        Pertanyaan.Uptgl.updateTgl(
          dataTgl,
          req.params.id_cust_handle,
          (err, data2) => {
            if (err) {
              res.status(500).send({
                message: err.message || "Ada error ketika memasukkan produk",
              });
            } else {
              res.send(data2);
            }
          }
        );
      }
    }
  );
};
