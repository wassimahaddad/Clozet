import React, { useState } from "react";
import CreateClozetItem from "../CreateClozetItem.component/CreateClozetItem.component";
import ClozetItem from "../ClozetItem/ClozetItem.component";
import api from "../../API/api";
import "./Clozet.component.css";

const Clozet = () => {
  const [data, setData] = useState();
  const [createItemDisplay, setCreateItemDisplay] = useState("hide");
  const [showAll, setShowAll] = useState("hide");
  const [clozetVisibility, setClozetVisibility] = useState(true);
  // -------------------------------------------------------------------------
  const handleClozet = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await api.get("/clozets", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(response.data);
      console.log(response.data);
      setShowAll("show-all-items");
      setCreateItemDisplay("hide");
    } catch (e) {
      console.log(e);
      return e.message;
    }
  };

  // -------------------------------------------------------------------------
  const handleRemove = (id) => {
    setData(data.filter((item) => item._id !== id));
    setClozetVisibility(false);
  };
  // -------------------------------------------------------------------------
  const handleItemCreate = () => {
    setCreateItemDisplay("show");
    setShowAll("hide");
  };
  // -------------------------------------------------------------------------
  const handleDisplay = (val) => {
    setCreateItemDisplay(val);
  };
  // -------------------------------------------------------------------------

  const handleShowClozet = (val) => {
    setClozetVisibility(val);
  };
  // // -------------------------------------------------------------------------
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
        <CreateClozetItem
          display={handleDisplay}
          clozetVisible={clozetVisibility}
          showClozet={handleShowClozet}
        />
      </div>
      <div className={showAll}>
        {data
          ? data.map((item) => {
              return (
                <div key={item._id}>
                  <ClozetItem remove={handleRemove} data={item} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Clozet;
