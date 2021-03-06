const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nocache = require("nocache");

const app = express();
const corsOptions = {
  origin: "*",
  allowedHeaders: "*",
  optionsSuccessStatus: 200,
  method: "GET ,HEAD ,PUT ,PATCH, POST, DELETE, OPTIONS",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(nocache());
app.disable("view cache");

app.use("/uploads", express.static("./app/uploads"));

app.get("/", (req, res) => {
  res.json({ message: "Selamat datang di API MTF." });
});

const port = 3000;
require("./app/routes/all.routes")(app);
app.listen(port, () => console.log(`Server ini berjalan dalam port 3000`));
