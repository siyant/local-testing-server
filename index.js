const fs = require("fs");
const express = require("express");
const multer = require("multer");

const app = express();
const port = 4000;
const uploadsDir = "uploads";

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.get("/", (req, res) => res.json({ message: "Hello World!" }));

app.post("/upload", upload.single("file"), function (req, res) {
  console.log(`Received file: ${req.file.originalname}`);
  res.json({ success: true });
});

app.all("*", function (req, res, next) {
  console.log("\n\n\n\n\n----------------- received request -----------------");
  console.log("req.method", req.method);
  console.log("req.url", req.url);
  console.log("\n\n--------- headers ---------");
  console.log(req.headers);
  console.log("\n\n--------- body ---------");
  console.log(req.body);
  res.json({ success: true });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
