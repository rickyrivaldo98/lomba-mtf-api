const sql = require("./db");

const User = function (user) {
  this.nama = user.nama;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("user yang telah didaftarkan:", {
      id: res.insertId,
      ...newUser,
    });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.getAll = (result) => {
  sql.query("SELECT * FROM user WHERE id_user = 99", (err, res) => {
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
  });
};

User.getByUser = (userNama, result) => {
  sql.query(`SELECT * FROM user WHERE nama = "${userNama}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Ditemukan: ", res);
      result(null, res);
      return;
    }

    result({ kind: "no_data" }, null);
  });
};

module.exports = User;
