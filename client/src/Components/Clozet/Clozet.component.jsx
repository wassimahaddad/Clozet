import React, { useState } from "react";
import CreateClozetItem from "../CreateClozetItem.component/CreateClozetItem.component";
import api from "../../API/api";
import "./Clozet.component.css";

const Clozet = () => {
  const [data, setData] = useState();
  const [createItemDisplay, setCreateItemDisplay] = useState("hide");
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------

  const handleItemCreate = () => {
    setCreateItemDisplay("show");
  };
  // -------------------------------------------------------------------------
  return (
    <div>
      <div className="clozet-menu">
        <div className="clozet-menu-item" onClick={handleItemCreate}>
          Create Clozet item
        </div>
        <div className="clozet-menu-item" onClick={handleClozet}>
          Search Clozet
        </div>
        <div className="clozet-menu-item" onClick={handleClozet}>
          Show Clozet items
        </div>
      </div>

      <div className={createItemDisplay}>
        <CreateClozetItem />
      </div>
    </div>
  );
};

export default Clozet;
