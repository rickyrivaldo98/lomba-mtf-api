const sql = require("./db");

const Tracking = function (track) {
  //   this.id_pengajuan = track.id_pengajuan;
  this.isberkasdiproses = track.isberkasdiproses;
  this.ispengajuandiproses = track.ispengajuandiproses;
  this.isisiform = track.isisiform;
  this.isinterview = track.isinterview;
  this.isverifikasi = track.isverifikasi;
  this.isapprove = track.isapprove;
  this.isfinish = track.isfinish;
};

Tracking.getByid = (id_pengajuan, result) => {
  sql.query(
    `SELECT * FROM tracking WHERE id_pengajuan="${id_pengajuan}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("ditemukan: ", res);
        result(null, {
          tracking: {
            isberkasdiproses: res[0].isberkasdiproses,
            ispengajuandiproses: res[0].ispengajuandiproses,
            isisiform: res[0].isisiform,
            isinterview: res[0].isinterview,
            isverifikasi: res[0].isverifikasi,
            isapprove: res[0].isapprove,
            isfinish: res[0].isfinish,
          },
        });
        return;
      }

      result({ kind: "no_data" }, null);
    }
  );
};

Tracking.update = function (dataTracking, id_pengajuan, result) {
  sql.query(
    // "INSERT INTO tracking (id_pengajuan, isberkasdiproses, ispengajuandiproses, isisiform, isinterview, isverifikasi, isapprove, isfinish) VALUES (?,?,?,?,?,?,?,?) ON DUPLICATE KEYS UPDATE isberkasdiproses = VALUES(isberkasdiproses), ispengajuandiproses = VALUES(ispengajuandiproses), isisiform = VALUES(isisiform), isinterview = VALUES(isinterview), isverifikasi = VALUES(isverifikasi), isapprove = VALUES(isapprove), isfinish = VALUES(isfinish)",
    "UPDATE tracking SET isberkasdiproses=?,ispengajuandiproses=?,isisiform=?,isinterview=?,isverifikasi=?,isapprove=?,isfinish=? WHERE id_pengajuan=?",
    [
      dataTracking.isberkasdiproses,
      dataTracking.ispengajuandiproses,
      dataTracking.isisiform,
      dataTracking.isinterview,
      dataTracking.isverifikasi,
      dataTracking.isapprove,
      dataTracking.isfinish,
      id_pengajuan,
    ],
    (err, res) => {
      if (err) {
        console.log("error tracking:", err);
        result(err, null);
        return;
      } else {
        result(null, {
          status: "Success",
          tracking: {
            ...dataTracking,
            // id_pengajuan: req.params.id_pengajuan,
            // isberkasdiproses: res[0].isberkasdiproses,
            // ispengajuandiproses: res[0].ispengajuandiproses,
            // isisiform: res[0].isisiform,
            // isinterview: res[0].isinterview,
            // isverifikasi: res[0].isverifikasi,
            // isapprove: res[0].isapprove,
            // isfinish: res[0].isfinish,
          },
        });
      }
    }
  );
};
module.exports = Tracking;
