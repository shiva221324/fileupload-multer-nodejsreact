const express = require("express");
const app = express();
app.use(express.json());
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  //destination it telll to store the files which were received from cilent side
  destination: (req, file, cb) => {
    //if file not exists we will create it
    if (!fs.existsSync(__dirname + "/temp")) {
      fs.mkdirSync(__dirname + "/temp");
    }
    cb(null, "./temp");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({
  storage: storage,
  //here we can add filters
  // it is optional
  limits: {
    fileSize: 1024,
  },
});

//single file
app.post("/singlefile", upload.single("file"), async (req, res) => {
  console.log("Files   ", req.file);
  res.json({
    success: true,
    file: req.file,
  });
});

//multiple files
//syntax upload.array("filename",count);
// count is optional default we upload as many as we wanta
app.post("/multiplefiles", upload.array("file"), async (req, res) => {
  co;
  for (const file of files) {
    const newFile = await File.create({
      name: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      path: file.path,
    });
  }
  res.json({
    success: true,
    file: req.files,
  });
});

app.listen(8070, (err) => {
  console.log("listening on port 8070");
});
