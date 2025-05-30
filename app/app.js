const express = require("express");

const path = require("path");

const app = express();

require("dotenv").config({ path: "../.env" });
app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
