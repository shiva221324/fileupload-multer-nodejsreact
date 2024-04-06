const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.static("images"));
app.use(express.json());
app.use(cors());
const Image = require("./models/Image");
mongoose
  .connect("mongodb://localhost:27017/multerfiles")
  .then(() => {
    console.log("database connection established");
  })
  .catch(() => {
    console.log("database connection not established");
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("./images")) {
      fs.mkdirSync("./images");
    }
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

//single file upload
app.post("/singleupload", upload.single("file"), async (req, res) => {
  try {
    const result = await Image.create({
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path,
    });
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "cannot upload file",
    });
  }
});

//multiple files upload
app.post("/multipleupload", upload.array("file"), async (req, res) => {
  try {
    const files = req.files;
    console.log(typeof files);
    console.log(files);
    for (const file of files) {
      const newFile = await Image.create({
        name: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        path: file.path,
      });
    }
    res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "cannot upload file",
    });
  }
});

app.get("/getallimages", async (req, res) => {
  try {
    const data = await Image.find();
    console.log(data);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
app.listen(8070, () => {
  console.log("listening on port 8070");
});
