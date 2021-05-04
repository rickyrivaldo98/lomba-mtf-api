const sql = require("./db");

const User = function (user) {
  this.nama = user.nama;
  this.no_telp = user.no_telp;
};
const listPertanyaan = function (pertanyaan) {
  this.id_pertanyaan = pertanyaan.id_pertanyaan;
  this.pertanyaan1 = pertanyaan.pertanyaan1;
  this.pertanyaan2 = pertanyaan.pertanyaan2;
  this.pertanyaan3 = pertanyaan.pertanyaan3;
};
const UpPertanyaan = function (pertanyaan) {
  this.id_listPertanyaan = pertanyaan.id_listPertanyaan;
};
const UpJawaban = function (jawaban) {
  this.jawaban1 = jawaban.jawaban1;
  this.jawaban2 = jawaban.jawaban2;
  this.jawaban3 = jawaban.jawaban3;
};

const Uptgl = function (tgl) {
  this.tgl_meet = tgl.tgl_meet;
};

User.getName = (idUser, result) => {
  sql.query(
    `SELECT user.nama, user.no_telp AS kontak, cust_handle.id_pengajuan, list_pertanyaan.pertanyaan1, list_pertanyaan.pertanyaan2, list_pertanyaan.pertanyaan3 FROM pertanyaan INNER JOIN list_pertanyaan ON pertanyaan.id_listPertanyaan=list_pertanyaan.id_listPertanyaan INNER JOIN cust_handle ON cust_handle.id_cust_handle=pertanyaan.id_cust_handle INNER JOIN user ON user.id_user=cust_handle.id_user WHERE cust_handle.id_pengajuan= "${idUser}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("ditemukan: ", {
        nama: res[0].nama,
        kontak: res[0].kontak,
        pertanyaan: res,
      });
      result(null, {
        status: "success",
        message:
          "Pengajuan anda sedang ditindaklanjuti oleh sales head, silahkan tunggu update selanjutnya pada menu ini",
        id_pengajuan: res[0].id_pengajuan,
        data_user: { nama: res[0].nama, kontak: res[0].kontak },
        pertanyaan: {
          pertanyaan1: res[0].pertanyaan1,
          pertanyaan2: res[0].pertanyaan2,
          pertanyaan3: res[0].pertanyaan3,
        },
      });
    }
  );
};

listPertanyaan.create = (dataPertanyaan, result) => {
  sql.query(
    "INSERT INTO list_pertanyaan (pertanyaan1, pertanyaan2, pertanyaan3) VALUES (?,?,?)",
    dataPertanyaan,
    (err, res) => {
      if (err) {
        console.log("error produk:", err);
        result(err, null);
        return;
      }
      result(null, {
        id_listPertanyaan: res.insertId,
      });
    }
  );
};

UpPertanyaan.update = (dataID, id_cust_handle, result) => {
  sql.query(
    `UPDATE pertanyaan SET id_listPertanyaan = ? WHERE id_cust_handle = ${id_cust_handle}`,
    [dataID.id_listPertanyaan],
    (err, res) => {
      if (err) {
        console.log("error produk:", err);
        result(err, null);
        return;
      } else {
        result(null, {
          res: res,
        });
      }
    }
  );
};

UpJawaban.updateJawaban = (dataJawaban, id_cust_handle, result) => {
  sql.query(
    `UPDATE pertanyaan SET jawaban1 = ?, jawaban2=?, jawaban3=? WHERE id_cust_handle = ${id_cust_handle}`,
    [dataJawaban.jawaban1, dataJawaban.jawaban2, dataJawaban.jawaban3],
    (err, res) => {
      if (err) {
        console.log("error produk:", err);
        result(err, null);
        return;
      } else {
        Uptgl.updateTgl = (dataTgl, id_cust_handle, result) => {
          sql.query(
            `UPDATE cust_handle SET tgl_meet=? WHERE id_cust_handle = ${id_cust_handle}`,
            [dataTgl.tgl_meet],
            (err, res) => {
              if (err) {
                console.log("error produk:", err);
                result(err, null);
                return;
              } else {
                result(null, {
                  res: res,
                });
              }
            }
          );
        };
      }
      result(null, {
        res: res,
      });
    }
  );
};

module.exports = { User, listPertanyaan, UpPertanyaan, UpJawaban, Uptgl };
