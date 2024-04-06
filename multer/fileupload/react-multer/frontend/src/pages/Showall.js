import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const Showall = () => {
  const [files, Setfiles] = useState();
  const [images, Setimages] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8070/getallimages")
      .then((res) => {
        console.log(res.data.data);
        Setimages(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {images.map((image) => {
        return (
          <img src={`http://localhost:8070/${image.filename}`} alt="image" />
        );
      })}
    </div>
  );
};

export default Showall;
