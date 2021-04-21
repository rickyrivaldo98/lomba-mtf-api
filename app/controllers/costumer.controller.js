const Costumer = require("../models/costumer.model");

exports.getAll = (req, res) => {
  Costumer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ada error ketika memanggil costumer",
      });
    else res.json(data);
  });
};
