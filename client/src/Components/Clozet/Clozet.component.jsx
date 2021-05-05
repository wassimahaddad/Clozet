import React, { useState } from "react";
import CreateClozetItem from "../CreateClozetItem.component/CreateClozetItem.component";
import api from "../../API/api";
import "./Clozet.component.css";

const Clozet = () => {
  const [data, setData] = useState();
  const [createItemDisplay, setCreateItemDisplay] = useState("hide");
  const [showAll, setShowAll] = useState("hide");
  // -------------------------------------------------------------------------
  const handleClozet = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await api.get("/wardrobes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(response.data[0]);

      setShowAll("show");
      setCreateItemDisplay("hide");
    } catch (e) {
      console.log(e);
      return e.message;
    }
  };

  // -------------------------------------------------------------------------

  const handleItemCreate = () => {
    setCreateItemDisplay("show");
    setShowAll("hide");
  };
  const handleDisplay = (val) => {
    setCreateItemDisplay(val);
  };
  // -------------------------------------------------------------------------
  return (
    <div>
      <div className="clozet-menu">
        <div className="clozet-menu-item" onClick={handleItemCreate}>
          Create
        </div>
        <div className="clozet-menu-item" onClick={handleClozet}>
          Search
        </div>
        <div className="clozet-menu-item" onClick={handleClozet}>
          Show all
        </div>
      </div>

      <div className={createItemDisplay}>
        <CreateClozetItem display={handleDisplay} />
      </div>
      <div className={showAll}>{data ? data.item : null}</div>
    </div>
  );
};

export default Clozet;
