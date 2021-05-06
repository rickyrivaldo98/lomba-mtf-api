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
  this.acuan_hitung = simulasi.acuan_hitung;
  this.harga_kendaraan = simulasi.harga_kendaraan;
  this.total_dp = simulasi.total_dp;
  this.pencairan = simulasi.pencairan;
  this.angsuran = simulasi.angsuran;
  this.tenor = simulasi.tenor;
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
  this.foto_stb = costumer.foto_stb;
  this.foto_slip_gaji = costumer.foto_slip_gaji;
  this.foto_pbb = costumer.foto_pbb;
  this.foto_selfi = costumer.foto_selfi;
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

const InsertTracking = function (track) {
  this.id_pengajuan = track.id_pengajuan;
};

const InsertCustHandle = function (handle) {
  this.id_pengajuan = handle.id_pengajuan;
};

const InsertPertanyaan = function (pertanyaan) {
  this.id_cust_handle = pertanyaan.id_cust_handle;
};

const LinkMeet = function (link) {
  this.link_meet = link.link_meet;
};

const Cust_handle = function (cust) {
  this.id_user = cust.id_user;
  this.id_pengajuan = cust.id_pengajuan;
  this.status = cust.status;
  this.link_meet = cust.link_meet;
  this.tgl_meet = cust.tgl_meet;
  this.digital_signature = cust.digital_signature;
  this.doc_term = cust.doc_term;
  this.docs_contract = cust.docs_contract;
};

let User;

Costumer.create = (dataCostumer, result) => {
  sql.query(
    "INSERT INTO costumer (id_alamat, id_cabang_pengajuan, nama, no_hp, email,  foto_kk, foto_ktp, foto_npwp, foto_stb, foto_slip_gaji, foto_pbb, foto_selfi) VALUES ((SELECT IFNULL(MAX(id_alamat), 0) + 1 FROM alamat),(SELECT IFNULL(MAX(id_cabang_pengajuan), 0)+1 FROM cabang_pengajuan),?,?,?,?,?,?,?,?,?,?)",
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
                          "INSERT INTO simulasi SET ?",
                          dataTDP,
                          (err, res4) => {
                            if (err) {
                              console.log("error produk:", err);
                              result(err, null);
                              return;
                            } else {
                              Pengajuan.create = (dataPengajuan, result) => {
                                sql.query(
                                  "INSERT INTO pengajuan (id_costumer, id_simulasi, id_simulasi_angsuran, kode_referal) VALUES ((SELECT IFNULL(MAX(id_costumer), 0)  FROM costumer), (SELECT IFNULL(MAX(id_simulasi), 0)  FROM simulasi), NULL, ?)",
                                  dataPengajuan,
                                  (err, res5) => {
                                    if (err) {
                                      console.log("error produk:", err);
                                      result(err, null);
                                      return;
                                    } else {
                                      InsertTracking.create = (result) => {
                                        sql.query(
                                          "INSERT INTO tracking SET id_pengajuan=?",
                                          [res5.insertId],
                                          (err, res6) => {
                                            if (err) {
                                              console.log("error produk:", err);
                                              result(err, null);
                                              return;
                                            } else {
                                              InsertCustHandle.create = (
                                                result
                                              ) => {
                                                sql.query(
                                                  "INSERT INTO cust_handle SET id_pengajuan=?",
                                                  [res5.insertId],
                                                  (err, res7) => {
                                                    if (err) {
                                                      console.log(
                                                        "error produk:",
                                                        err
                                                      );
                                                      result(err, null);
                                                      return;
                                                    } else {
                                                      InsertPertanyaan.create = (
                                                        result
                                                      ) => {
                                                        sql.query(
                                                          "INSERT INTO pertanyaan SET id_cust_handle=?",
                                                          [res7.insertId],
                                                          (err, res8) => {
                                                            if (err) {
                                                              console.log(
                                                                "error produk:",
                                                                err
                                                              );
                                                              result(err, null);
                                                              return;
                                                            }
                                                            console.log(
                                                              "simulasi yang masuk:",
                                                              {
                                                                id_cust_handle:
                                                                  res7.insertId,
                                                                id_tracking:
                                                                  res6.insertId,
                                                                // ...dataTracking,
                                                                id_pengajuan:
                                                                  res5.insertId,
                                                                ...dataPengajuan,
                                                                id_simulasi:
                                                                  res4.insertId,
                                                                ...dataTDP,
                                                                id_cabang_pengajuan:
                                                                  res3.insertId,
                                                                ...dataCabang,
                                                                id_alamat:
                                                                  res2.insertId,
                                                                ...dataAlamat,
                                                                id_costumer:
                                                                  res.insertId,
                                                                ...dataCostumer,
                                                              }
                                                            );
                                                            result(null, {
                                                              status: "Success",
                                                              id_cust_handle:
                                                                res7.insertId,
                                                              id_pengajuan:
                                                                res5.insertId,
                                                              id_costumer:
                                                                res.insertId,
                                                              massage:
                                                                "Data Telah Terkirim",
                                                            });
                                                          }
                                                        );
                                                      };
                                                    }
                                                    result(null, {
                                                      status: "Success",
                                                      id_pengajuan:
                                                        res5.insertId,
                                                      id_costumer: res.insertId,
                                                      massage:
                                                        "Data Telah Terkirim",
                                                    });
                                                  }
                                                );
                                              };
                                            }
                                            result(null, {
                                              status: "Success",
                                              id_pengajuan: res5.insertId,
                                              id_costumer: res.insertId,
                                              massage: "Data Telah Terkirim",
                                            });
                                          }
                                        );
                                      };
                                    }
                                    result(null, {
                                      status: "Success",
                                      id_costumer: res.insertId,
                                      massage: "Data Telah Terkirim",
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

Costumer.getAll = (result) => {
  sql.query(
    "SELECT costumer.nama, tracking.* FROM costumer INNER JOIN pengajuan ON costumer.id_costumer=pengajuan.id_costumer INNER JOIN tracking ON pengajuan.id_pengajuan=tracking.id_pengajuan",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("ditemukan: ", res);
        result(null, res);
        return;
      }

      result({ kind: "no_data" }, null);
    }
  );
};

Costumer.getById_costumer = (id_costumer, result) => {
  sql.query(
    `SELECT * FROM costumer INNER JOIN pengajuan ON costumer.id_costumer=pengajuan.id_costumer 
    INNER JOIN tracking ON pengajuan.id_pengajuan=tracking.id_pengajuan 
    INNER JOIN cust_handle ON pengajuan.id_pengajuan= cust_handle.id_pengajuan 
    INNER JOIN pertanyaan ON cust_handle.id_cust_handle=pertanyaan.id_cust_handle 
    WHERE costumer.id_costumer = "${id_costumer}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("ditemukan: ", res);
        result(null, res);
        return;
      }

      result({ kind: "no_data" }, null);
    }
  );
};

LinkMeet.getLink = (id_cust_handle, result) => {
  sql.query(
    `SELECT link_meet FROM cust_handle WHERE id_cust_handle = ${id_cust_handle}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("ditemukan: ", res);
        result(null, res);
        return;
      }

      result({ kind: "no_data" }, null);
    }
  );
};

Cust_handle.getByID = (id_cust_handle, result) => {
  sql.query(
    `SELECT * FROM cust_handle WHERE id_cust_handle = ${id_cust_handle}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("ditemukan: ", res);
        result(null, res);
        return;
      }

      result({ kind: "no_data" }, null);
    }
  );
};

Cust_handle.Update = (dataDigital, id_cust_handle, result) => {
  sql.query(
    `UPDATE cust_handle SET status=?,link_meet=?,tgl_meet=?,digital_signature=?,doc_term=?,docs_contract=? WHERE id_cust_handle = ${id_cust_handle}`,
    [
      dataDigital.status,
      dataDigital.link_meet,
      dataDigital.tgl_meet,
      dataDigital.digital_signature,
      dataDigital.doc_term,
      dataDigital.docs_contract,
    ],
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

module.exports = {
  Costumer,
  Alamat,
  CabangPengajuan,
  PengajuanTDP,
  Pengajuan,
  InsertTracking,
  InsertCustHandle,
  InsertPertanyaan,
  LinkMeet,
  Cust_handle,
};
