const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
dbConnection();

app.use(express.static("public"));


app.use("/api/login", require("./routes/auth"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
  console.log("server iniciado en puerto ", PORT);
});
