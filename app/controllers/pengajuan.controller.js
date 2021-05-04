const Pengajuan = require("../models/pengajuan.model");
const path = require("path");
const sharp = require("sharp");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "isi tidak bisa kosong",
    });
  }
  const dataCostumer = new Pengajuan.Costumer({
    nama: req.body.nama,
    no_hp: req.body.no_hp,
    email: req.body.email,
    foto_kk: req.files.foto_kk[0].filename,
    foto_ktp: req.files.foto_ktp[0].filename,
    foto_npwp: req.files.foto_npwp[0].filename,
    foto_stb: req.files.foto_stb[0].filename,
    foto_slip_gaji: req.files.foto_slip_gaji[0].filename,
    foto_pbb: req.files.foto_pbb[0].filename,
    foto_selfi: req.files.foto_selfi[0].filename,
  });
  const valueDataCostumer = [
    dataCostumer.nama,
    dataCostumer.no_hp,
    dataCostumer.email,
    dataCostumer.foto_kk,
    dataCostumer.foto_ktp,
    dataCostumer.foto_npwp,
    dataCostumer.foto_stb,
    dataCostumer.foto_slip_gaji,
    dataCostumer.foto_pbb,
    dataCostumer.foto_selfi,
  ];

  const dataAlamat = new Pengajuan.Alamat({
    kota: req.body.alamat_kota,
    detail_alamat: req.body.alamat_detail,
  });

  const dataCabang = new Pengajuan.CabangPengajuan({
    kota_pengajuan: req.body.cabang_kota,
    detail_pengajuan: req.body.cabang_detail,
  });

  const dataTDP = new Pengajuan.PengajuanTDP({
    produk: req.body.produk,
    acuan_hitung: req.body.acuan_hitung,
    harga_kendaraan: req.body.harga_kendaraan,
    total_dp: req.body.total_dp,
    pencairan: req.body.pencairan,
    angsuran: req.body.angsuran,
    tenor: req.body.tenor,
    tahun_kendaraan: req.body.tahun_kendaraan,
    area: req.body.area,
    fiducia: req.body.fiducia,
    asuransi: req.body.asuransi,
  });

  const dataPengajuan = new Pengajuan.Pengajuan({
    kode_referal: req.body.kode_referal,
  });

  const valueDataPengajuan = [dataPengajuan.kode_referal];

  // const dataTracking = new Pengajuan.InsertTracking({});

  Pengajuan.Costumer.create(valueDataCostumer, (err, data) => {
    console.log(req.file);
    if (err) {
      res.status(500).send({
        message: err.message || "Ada error ketika memasukkan produk",
      });
    } else {
      Pengajuan.Alamat.create(dataAlamat, (err, data2) => {
        if (err) {
          res.status(500).send({
            message: err.message || "Ada error ketika memasukkan produk",
          });
        } else {
          Pengajuan.CabangPengajuan.create(dataCabang, (err, data3) => {
            if (err) {
              res.status(500).send({
                message: err.message || "Ada error ketika memasukkan produk",
              });
            } else {
              Pengajuan.PengajuanTDP.create(dataTDP, (err, data4) => {
                if (err) {
                  res.status(500).send({
                    message:
                      err.message || "Ada error ketika memasukkan produk",
                  });
                } else {
                  Pengajuan.Pengajuan.create(
                    valueDataPengajuan,
                    (err, data5) => {
                      if (err) {
                        res.status(500).send({
                          message:
                            err.message || "Ada error ketika memasukkan produk",
                        });
                      } else {
                        Pengajuan.InsertTracking.create((err, data6) => {
                          if (err) {
                            res.status(500).send({
                              message:
                                err.message ||
                                "Ada error ketika memasukkan produk",
                            });
                          } else {
                            Pengajuan.InsertCustHandle.create((err, data7) => {
                              if (err) {
                                res.status(500).send({
                                  message:
                                    err.message ||
                                    "Ada error ketika memasukkan produk",
                                });
                              } else {
                                Pengajuan.InsertPertanyaan.create(
                                  (err, data8) => {
                                    if (err) {
                                      res.status(500).send({
                                        message:
                                          err.message ||
                                          "Ada error ketika memasukkan produk",
                                      });
                                    } else {
                                      sharp("./" + req.files.foto_kk[0].path)
                                        .toBuffer()
                                        .then((data8) => {
                                          sharp(data8)
                                            // .toFormat("png")
                                            // .resize(1080)
                                            .png({
                                              progressive: true,
                                              compressionLevel: 5,
                                            })
                                            .jpeg({
                                              progressive: true,
                                              quality: 50,
                                            })
                                            .toFile(
                                              "./" + req.files.foto_kk[0].path,
                                              (err, info) => {
                                                console.log("oke");
                                              }
                                            );
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });

                                      sharp("./" + req.files.foto_ktp[0].path)
                                        .toBuffer()
                                        .then((data8) => {
                                          sharp(data8)
                                            // .toFormat("png")
                                            // .resize(1080)
                                            .png({
                                              progressive: true,
                                              compressionLevel: 5,
                                            })
                                            .jpeg({
                                              progressive: true,
                                              quality: 50,
                                            })
                                            .toFile(
                                              "./" + req.files.foto_ktp[0].path,
                                              (err, info) => {
                                                console.log("oke");
                                              }
                                            );
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });

                                      sharp("./" + req.files.foto_npwp[0].path)
                                        .toBuffer()
                                        .then((data8) => {
                                          sharp(data8)
                                            // .toFormat("png")
                                            // .resize(1080)
                                            .png({
                                              progressive: true,
                                              compressionLevel: 5,
                                            })
                                            .jpeg({
                                              progressive: true,
                                              quality: 50,
                                            })
                                            .toFile(
                                              "./" +
                                                req.files.foto_npwp[0].path,
                                              (err, info) => {
                                                console.log("oke");
                                              }
                                            );
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });

                                      sharp("./" + req.files.foto_stb[0].path)
                                        .toBuffer()
                                        .then((data8) => {
                                          sharp(data8)
                                            // .toFormat("png")
                                            // .resize(1080)
                                            .png({
                                              progressive: true,
                                              compressionLevel: 5,
                                            })
                                            .jpeg({
                                              progressive: true,
                                              quality: 50,
                                            })
                                            .toFile(
                                              "./" + req.files.foto_stb[0].path,
                                              (err, info) => {
                                                console.log("oke");
                                              }
                                            );
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });

                                      sharp(
                                        "./" + req.files.foto_slip_gaji[0].path
                                      )
                                        .toBuffer()
                                        .then((data8) => {
                                          sharp(data8)
                                            // .toFormat("png")
                                            // .resize(1080)
                                            .png({
                                              progressive: true,
                                              compressionLevel: 5,
                                            })
                                            .jpeg({
                                              progressive: true,
                                              quality: 50,
                                            })
                                            .toFile(
                                              "./" +
                                                req.files.foto_slip_gaji[0]
                                                  .path,
                                              (err, info) => {
                                                console.log("oke");
                                              }
                                            );
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });

                                      sharp("./" + req.files.foto_pbb[0].path)
                                        .toBuffer()
                                        .then((data8) => {
                                          sharp(data8)
                                            // .toFormat("png")
                                            // .resize(1080)
                                            .png({
                                              progressive: true,
                                              compressionLevel: 5,
                                            })
                                            .jpeg({
                                              progressive: true,
                                              quality: 50,
                                            })
                                            .toFile(
                                              "./" + req.files.foto_pbb[0].path,
                                              (err, info) => {
                                                console.log("oke");
                                              }
                                            );
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });

                                      sharp("./" + req.files.foto_selfi[0].path)
                                        .toBuffer()
                                        .then((data8) => {
                                          sharp(data8)
                                            // .toFormat("png")
                                            // .resize(1080)
                                            .png({
                                              progressive: true,
                                              compressionLevel: 5,
                                            })
                                            .jpeg({
                                              progressive: true,
                                              quality: 50,
                                            })
                                            .toFile(
                                              "./" +
                                                req.files.foto_selfi[0].path,
                                              (err, info) => {
                                                console.log("oke");
                                              }
                                            );
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });

                                      res.send(data8);
                                    }
                                  }
                                );
                              }
                            });
                          }
                        });
                      }
                    }
                  );
                }
              });
            }
          });
        }
      });
    }
  });

  // const dataProduk = new Pengajuan.Pengajuan({
  //   jenis_kendaraan: req.body.jenis_kendaraan,
  //   nama_brand: req.body.nama_brand,
  //   type_brand: req.body.type_brand,
  //   detail_brand: req.body.detail_brand,
  //   harga_kendaraan: req.body.harga_kendaraan,
  //   keterangan_produk: req.body.keterangan_produk,
  // });

  // const dataSimulasi = new Pengajuan.Pengajuan2({
  //   id_promo: req.body.id_promo,
  //   harga_kendaraan: req.body.harga_kendaraan_pengajuan,
  //   total_dp: req.body.total_dp,
  //   tahun_kendaraan: req.body.tahun_kendaraan,
  //   area: req.body.area,
  //   fiducia: req.body.fiducia,
  //   asuransi: req.body.asuransi,
  // });

  // const value = [
  //   dataSimulasi.id_promo,
  //   dataSimulasi.harga_kendaraan,
  //   dataSimulasi.total_dp,
  //   dataSimulasi.tahun_kendaraan,
  //   dataSimulasi.area,
  //   dataSimulasi.fiducia,
  //   dataSimulasi.asuransi,
  // ];

  // const dataPengajuan = new Pengajuan.Pengajuan3({
  //   id_costumer: req.body.id_costumer,
  // });

  // const value2 = [dataPengajuan.id_costumer];

  // Pengajuan.Pengajuan.create(dataProduk, (err, data) => {
  //   if (err) {
  //     res.status(500).send({
  //       message: err.message || "Ada error ketika memasukkan produk",
  //     });
  //   } else {
  //     Pengajuan.Pengajuan2.create(value, (err, data2) => {
  //       if (err) {
  //         res.status(500).send({
  //           message: err.message || "Ada error ketika memasukkan pengajuan",
  //         });
  //         // dataP = data2;
  //       } else {
  //         Pengajuan.Pengajuan3.create(value2, (err, data3) => {
  //           if (err) {
  //             res.status(500).send({
  //               message: err.message || "Ada error ketika memasukkan pengajuan",
  //             });
  //             // dataP = data2;
  //           } else {
  //             res.send(data3);
  //           }
  //         });
  //         // res.send(data2);
  //       }
  //       // console.log(data2);
  //     });
  //     // res.send(dataP);
  //     // res.send(data);
  //     // res.end();
  //   }
  //   // console.log(data);
  //   // if (err)
  //   //   res.status(500).send({
  //   //     message: err.message || "Ada error ketika memasukkan produk",
  //   //   });
  //   // // else res.send(data);
  //   // Pengajuan.Pengajuan2.create(dataSimulasi, (err, data) => {
  //   //   if (err)
  //   //     res.status(500).send({
  //   //       message: err.message || "Ada error ketika memasukkan pengajuan",
  //   //     });
  //   //   else res.send(data);
  //   // });
  // });
};

exports.getAll = (req, res) => {
  Pengajuan.Costumer.getAll((err, data) => {
    if (err) {
      if (err.kind === "no_data") {
        res.status(404).send({
          message: `Not found any costumer.`,
          empty: true,
        });
      } else {
        res.status(500).send({
          message: "Error ambil costumer",
        });
      }
    } else res.send(data);
  });
};

exports.getById_costumer = (req, res) => {
  Pengajuan.Costumer.getById_costumer(req.params.id_costumer, (err, data) => {
    if (err) {
      if (err.kind === "no_data") {
        res.status(404).send({
          message: `Not found any costumer.`,
          empty: true,
        });
      } else {
        res.status(500).send({
          message: "Error ambil costumer",
        });
      }
    } else res.send(data);
  });
};

exports.getLink = (req, res) => {
  Pengajuan.LinkMeet.getLink(req.params.id_cust_handle, (err, data) => {
    if (err) {
      if (err.kind === "no_data") {
        res.status(404).send({
          message: `Not found any costumer.`,
          empty: true,
        });
      } else {
        res.status(500).send({
          message: "Error ambil costumer",
        });
      }
    } else res.send(data);
  });
};

exports.getByID = (req, res) => {
  Pengajuan.Cust_handle.getByID(req.params.id_cust_handle, (err, data) => {
    if (err) {
      if (err.kind === "no_data") {
        res.status(404).send({
          message: `Not found any costumer.`,
          empty: true,
        });
      } else {
        res.status(500).send({
          message: "Error ambil costumer",
        });
      }
    } else res.send(data);
  });
};

exports.Update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "isi tidak bisa kosong",
    });
  }
  const dataDigital = new Pengajuan.Cust_handle({
    status: req.body.status,
    link_meet: req.body.link_meet,
    tgl_meet: req.body.tgl_meet,
    digital_signature: req.body.digital_signature,
    doc_term: req.body.doc_term,
    docs_contract: req.body.docs_contract,
  });
  Pengajuan.Cust_handle.Update(
    dataDigital,
    req.params.id_cust_handle,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Ada error ketika memasukkan produk",
        });
      }
      res.send(data);
    }
  );
};
