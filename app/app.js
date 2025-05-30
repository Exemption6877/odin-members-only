const express = require("express");

const path = require("path");

const app = express();

require("dotenv").config({ path: "../.env" });
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const PORT = process.env.APP_PORT;

const indexContent = require("./routers/contentRouter");

app.use("/", indexContent);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
