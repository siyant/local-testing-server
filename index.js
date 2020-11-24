const fs = require("fs");
const express = require("express");
const multer = require("multer");

const app = express();
const port = 4000;
const uploadsDir = "uploads";

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

app.listen(port, () => console.log(`Server running on port ${port}`));
