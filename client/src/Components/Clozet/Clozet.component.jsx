import React, { useState } from "react";
import api from "../../API/api";
import "./Clozet.component.css";

const Clozet = () => {
  const [data, setData] = useState();

  const handleClozet = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await api.get("/wardrobes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(response.data[0]);
    } catch (e) {
      console.log(e);
      return e.message;
    }
  };

  return (
    <div>
      <button onClick={handleClozet}>get image</button>
      <div className="text-image">
        {data ? (
          <>
            <img src={`data: image/png;base64,${data.img}`} alt="Clozet" />
            <div>{data.item}</div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Clozet;
