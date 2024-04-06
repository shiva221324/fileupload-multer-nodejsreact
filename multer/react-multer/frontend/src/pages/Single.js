import React from "react";
import { useState } from "react";
import axios from "axios";
const Single = () => {
  const [file, setFile] = useState();
  const handleUpload = (e) => {
    const formdata = new FormData();
    formdata.append("file", file);
    console.log(formdata);
    axios
      .post("http://localhost:8070/singleupload", formdata)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Single;
