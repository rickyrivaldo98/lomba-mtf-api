const sql = require("./db");

// const Pengajuan = function (produk) {
//   //produk
//   //   this.id_produk = simulasi.id_produk;
//   this.jenis_kendaraan = produk.jenis_kendaraan;
//   this.nama_brand = produk.nama_brand;
//   this.type_brand = produk.type_brand;
//   this.detail_brand = produk.detail_brand;
//   this.harga_kendaraan = produk.harga_kendaraan;
//   this.keterangan_produk = produk.keterangan_produk;
// };

// const Pengajuan2 = function (simulasi) {
//   //simulasi_tdp
//   this.id_promo = simulasi.id_promo;
//   this.harga_kendaraan = simulasi.harga_kendaraan;
//   this.total_dp = simulasi.total_dp;
//   this.tahun_kendaraan = simulasi.tahun_kendaraan;
//   this.area = simulasi.area;
//   this.fiducia = simulasi.fiducia;
//   this.asuransi = simulasi.asuransi;
// };

// const Pengajuan3 = function (pengajuanLast) {
//   this.id_costumer = pengajuanLast.id_costumer;
// };

const PengajuanTDP = function (simulasi) {
  this.produk = simulasi.produk;
  this.harga_kendaraan = simulasi.harga_kendaraan;
  this.total_dp = simulasi.total_dp;
  this.tahun_kendaraan = simulasi.tahun_kendaraan;
  this.area = simulasi.area;
  this.fiducia = simulasi.fiducia;
  this.asuransi = simulasi.asuransi;
};

const Costumer = function (costumer) {
  this.nama = costumer.nama;
  this.no_hp = costumer.no_hp;
  this.email = costumer.email;
  this.foto_kk = costumer.foto_kk;
  this.foto_ktp = costumer.foto_ktp;
  this.foto_npwp = costumer.foto_npwp;
  this.foto_akte_nikah = costumer.foto_akte_nikah;
  this.foto_slip_gaji = costumer.foto_slip_gaji;
  this.foto_pbb = costumer.foto_pbb;
};

const Alamat = function (alamat) {
  this.kota = alamat.kota;
  this.detail_alamat = alamat.detail_alamat;
};

const CabangPengajuan = function (alamat) {
  this.kota_pengajuan = alamat.kota_pengajuan;
  this.detail_pengajuan = alamat.detail_pengajuan;
};

const Pengajuan = function (pengajuan) {
  this.kode_referal = pengajuan.kode_referal;
};

Costumer.create = (dataCostumer, result) => {
  sql.query(
    "INSERT INTO costumer (id_alamat, id_cabang_pengajuan, nama, no_hp, email,  foto_kk, foto_ktp, foto_npwp, foto_akte_nikah, foto_slip_gaji, foto_pbb) VALUES ((SELECT IFNULL(MAX(id_alamat), 0) + 1 FROM alamat),(SELECT IFNULL(MAX(id_cabang_pengajuan), 0)+1 FROM cabang_pengajuan),?,?,?,?,?,?,?,?,?)",
    dataCostumer,
    (err, res) => {
      if (err) {
        console.log("error produk:", err);
        result(err, null);
        return;
      } else {
        Alamat.create = (dataAlamat, result) => {
          sql.query("INSERT INTO alamat SET ?", dataAlamat, (err, res2) => {
            if (err) {
              console.log("error produk:", err);
              result(err, null);
              return;
            } else {
              CabangPengajuan.create = (dataCabang, result) => {
                sql.query(
                  "INSERT INTO cabang_pengajuan SET ?",
                  dataCabang,
                  (err, res3) => {
                    if (err) {
                      console.log("error produk:", err);
                      result(err, null);
                      return;
                    } else {
                      PengajuanTDP.create = (dataTDP, result) => {
                        sql.query(
                          "INSERT INTO simulasi_tdp SET ?",
                          dataTDP,
                          (err, res4) => {
                            if (err) {
                              console.log("error produk:", err);
                              result(err, null);
                              return;
                            } else {
                              Pengajuan.create = (dataPengajuan, result) => {
                                sql.query(
                                  "INSERT INTO pengajuan (id_costumer, id_simulasi_tdp, id_simulasi_angsuran, kode_referal) VALUES ((SELECT IFNULL(MAX(id_costumer), 0) + 1 FROM costumer), (SELECT IFNULL(MAX(id_simulasi_tdp), 0) + 1 FROM simulasi_tdp), NULL, ?)",
                                  dataPengajuan,
                                  (err, res5) => {
                                    if (err) {
                                      console.log("error produk:", err);
                                      result(err, null);
                                      return;
                                    }
                                    console.log("simulasi yang masuk:", {
                                      id_pengajuan: res5.insertId,
                                      ...dataPengajuan,
                                      id_simulasi_tdp: res4.insertId,
                                      ...dataTDP,
                                      id_cabang_pengajuan: res3.insertId,
                                      ...dataCabang,
                                      id_alamat: res2.insertId,
                                      ...dataAlamat,
                                      id_costumer: res.insertId,
                                      ...dataCostumer,
                                    });
                                    result(null, {
                                      response: true,
                                    });
                                  }
                                );
                              };
                            }
                            result(null, {
                              response: true,
                            });
                          }
                        );
                      };
                    }
                    result(null, {
                      response: true,
                    });
                  }
                );
              };
            }
            result(null, {
              response: true,
            });
          });
        };
      }
      result(null, {
        response: true,
      });
    }
  );
  // sql.query(`
  // BEGIN;
  // INSERT INTO produk (jenis_kendaraan,nama_brand,type_brand,detail_brand,harga_kendaraan,keterangan_produk) VALUES (?);
  // INSET INTO simulasi_tdp() SET
  // `)
  // sql.query("INSERT INTO produk SET ?", dataProduk, (err, res) => {
  //   if (err) {
  //     console.log("error produk:", err);
  //     result(err, null);
  //     return;
  //   } else {
  //     Pengajuan2.create = (dataSimulasi, result) => {
  //       sql.query(
  //         "INSERT INTO simulasi_tdp(id_simulasi_tdp,id_produk, id_promo, harga_kendaraan, total_dp, tahun_kendaraan, area, fiducia, asuransi) VALUES (NULL,LAST_INSERT_ID(),?,?,?,?,?,?,?)",
  //         dataSimulasi,
  //         (err, res2) => {
  //           if (err) {
  //             console.log("error simulasi:", err);
  //             result(err, null);
  //             return;
  //           }
  //           else {
  //             Pengajuan3.create = (dataPengajuan, result) => {
  //               sql.query(
  //                 "INSERT INTO pengajuan(id_pengajuan, id_simulasi_tdp, id_simulasi_angsuran, id_costumer) VALUES (NULL, LAST_INSERT_ID(), NULL,?)",
  //                 dataPengajuan,
  //                 (err, res3) => {
  //                   if (err) {
  //                     console.log("error pengajuan:", err);
  //                     result(err, null);
  //                     return;
  //                   } else {
  //                     console.log("pengajuan yang masuk:", {
  //                       id_pengajuan: res3.insertId,
  //                       ...dataPengajuan,
  //                       // id_simulasi_tdp: res2.insertId,
  //                       // ...dataSimulasi,
  //                       // produk: {
  //                       //   id_produk: res.insertId,
  //                       //   ...dataProduk,
  //                       // },
  //                       // response: res2,
  //                     });

  //                     result(null, {
  //                       // id_pengajuan: res3.insertId,
  //                       // id_simulasi_tdp: res2.insertId,
  //                       // ...dataSimulasi,
  //                       // produk: {
  //                       //   id_produk: res.insertId,
  //                       //   ...dataProduk,
  //                       // },
  //                       response: true,
  //                     });
  //                   }
  //                 }
  //               );
  //             };
  //           }
  //           console.log("simulasi yang masuk:", {
  //             id_simulasi_tdp: res2.insertId,
  //             ...dataSimulasi,
  //             produk: {
  //               id_produk: res.insertId,
  //               ...dataProduk,
  //             },
  //             // response: res2,
  //           });

  //           result(null, {
  //             id_simulasi_tdp: res2.insertId,
  //             ...dataSimulasi,
  //             produk: {
  //               id_produk: res.insertId,
  //               ...dataProduk,
  //             },
  //             response: true,
  //           });
  //         }
  //       );
  //       // console.log(dataSimulasi);
  //     };
  //   }
  //   // console.log("produk yang masuk:", {
  //   //   id_produk: res.insertId,
  //   //   ...dataProduk,
  //   // });
  //   result(null, { id_produk: res.insertId, ...dataProduk });
  // });
};

module.exports = { Costumer, Alamat, CabangPengajuan, PengajuanTDP, Pengajuan };
