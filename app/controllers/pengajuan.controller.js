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
    foto_akte_nikah: req.files.foto_akte_nikah[0].filename,
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
    dataCostumer.foto_akte_nikah,
    dataCostumer.foto_slip_gaji,
    dataCostumer.foto_pbb,
    dataCostumer.foto_selfi,
  ];

  const dataAlamat = new Pengajuan.Alamat({
    kota: req.body.kota,
    detail_alamat: req.body.detail_alamat,
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
                        sharp("./" + req.files.foto_kk[0].path)
                          .toBuffer()
                          .then((data5) => {
                            sharp(data5)
                              // .toFormat("png")
                              // .resize(1080)
                              .png({ progressive: true, compressionLevel: 5 })
                              .jpeg({ progressive: true, quality: 50 })
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
                          .then((data5) => {
                            sharp(data5)
                              // .toFormat("png")
                              // .resize(1080)
                              .png({ progressive: true, compressionLevel: 5 })
                              .jpeg({ progressive: true, quality: 50 })
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
                          .then((data5) => {
                            sharp(data5)
                              // .toFormat("png")
                              // .resize(1080)
                              .png({ progressive: true, compressionLevel: 5 })
                              .jpeg({ progressive: true, quality: 50 })
                              .toFile(
                                "./" + req.files.foto_npwp[0].path,
                                (err, info) => {
                                  console.log("oke");
                                }
                              );
                          })
                          .catch((err) => {
                            console.log(err);
                          });

                        sharp("./" + req.files.foto_akte_nikah[0].path)
                          .toBuffer()
                          .then((data5) => {
                            sharp(data5)
                              // .toFormat("png")
                              // .resize(1080)
                              .png({ progressive: true, compressionLevel: 5 })
                              .jpeg({ progressive: true, quality: 50 })
                              .toFile(
                                "./" + req.files.foto_akte_nikah[0].path,
                                (err, info) => {
                                  console.log("oke");
                                }
                              );
                          })
                          .catch((err) => {
                            console.log(err);
                          });

                        sharp("./" + req.files.foto_slip_gaji[0].path)
                          .toBuffer()
                          .then((data5) => {
                            sharp(data5)
                              // .toFormat("png")
                              // .resize(1080)
                              .png({ progressive: true, compressionLevel: 5 })
                              .jpeg({ progressive: true, quality: 50 })
                              .toFile(
                                "./" + req.files.foto_slip_gaji[0].path,
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
                          .then((data5) => {
                            sharp(data5)
                              // .toFormat("png")
                              // .resize(1080)
                              .png({ progressive: true, compressionLevel: 5 })
                              .jpeg({ progressive: true, quality: 50 })
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
                          .then((data5) => {
                            sharp(data5)
                              // .toFormat("png")
                              // .resize(1080)
                              .png({ progressive: true, compressionLevel: 5 })
                              .jpeg({ progressive: true, quality: 50 })
                              .toFile(
                                "./" + req.files.foto_selfi[0].path,
                                (err, info) => {
                                  console.log("oke");
                                }
                              );
                          })
                          .catch((err) => {
                            console.log(err);
                          });

                        res.send(data5);
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
