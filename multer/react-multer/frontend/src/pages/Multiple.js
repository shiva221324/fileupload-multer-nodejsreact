import React from "react";
import { useState } from "react";
import axios from "axios";
const Multiple = () => {
  const [files, setFiles] = useState(null);
  const handleUpload = async (e) => {
    try {
      const formdata = new FormData();
      for (let key in files) {
        formdata.append("file", files[key]);
        console.log(formdata);
      }
      console.log(typeof files);
      const result = await axios.post(
        "http://localhost:8070/multipleupload",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <input type="file" onChange={(e) => setFiles(e.target.files)} multiple />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Multiple;
