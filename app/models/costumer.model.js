const sql = require("./db");

const Costumer = function (costumer) {
  this.nama = costumer.nama;
  this.no_hp = costumer.no_hp;
  this.email = costumer.email;
  this.id_alamat = costumer.id_alamat;
  this.foto_kk = costumer.foto_kk;
  this.foto_ktp = costumer.foto_ktp;
  this.foto_npwp = costumer.foto_npwp;
  this.foto_akte_nikah = costumer.foto_akte_nikah;
  this.foto_slip_gaji = costumer.foto_slip_gaji;
  this.foto_pbb = costumer.foto_pbb;
};

var options = {
  sql:
    "SELECT * FROM costumer LEFT JOIN alamat ON alamat.id_alamat=costumer.id_alamat",
  nestTables: true,
};
//untuk get bila data hanya satu dan res berupa object
// Costumer.getAll = (result) => {
//   sql.query(options, (err, res, fields) => {
//     if (err) {
//       console.log("error:", err);
//       result(err, null);
//       return;
//     }
//     res[0].costumer.id_alamat = res[0].alamat;
//     delete res[0].alamat;
//     console.log("costumer yang terambil:", res);
//     result(null, res[0]);
//   });
// };

// get kalo banyak data
// Costumer.getAll = (result) => {
//   sql.query(options, (err, res, fields) => {
//     if (err) {
//       console.log("error:", err);
//       result(err, null);
//       return;
//     }
//     res.map((cust) => {
//       cust.costumer.id_alamat = cust.alamat;
//       delete cust.alamat;
//     });
//     console.log("costumer yang terambil:", res);
//     result(null, res);
//   });
// };

module.exports = Costumer;
