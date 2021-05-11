import React, { useState, useEffect } from "react";
import CreateClozetItem from "../CreateClozetItem.component/CreateClozetItem.component";
import ClozetItem from "../ClozetItem/ClozetItem.component";
import api from "../../API/api";
import "./Clozet.component.css";

const Clozet = ({ userName, clozetCreate, clozetCreateUpdate }) => {
  const [data, setData] = useState();
  const [createItemDisplay, setCreateItemDisplay] = useState("hide");
  const [showAll, setShowAll] = useState("hide");
  const [clozetVisibility, setClozetVisibility] = useState(true);
  const [persons, setPersons] = useState();
  const [spinner, setSpinner] = useState("hidden");
  // -------------------------------------------------------------------------
  useEffect(() => {
    setCreateItemDisplay(clozetCreate);
  }, [clozetCreate]);
  // -------------------------------------------------------------------------
  const handleClozet = async () => {
    setSpinner("page-loader");
    setCreateItemDisplay("hide");
    try {
      const token = await localStorage.getItem("token");
      const response = await api.get("/clozets", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(response.data);
      console.log(response.data);
      setShowAll("show-all-items");

      setSpinner("hidden");
    } catch (e) {
      console.log(e);
      return e.message;
    }
  };

  // -------------------------------------------------------------------------
  const getPersons = async () => {
    const token = await localStorage.getItem("token");
    const response = await api.get(
      "/persons",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPersons(response.data);
    console.log(response.data);
  };

  // -------------------------------------------------------------------------
  const handleRemove = (id) => {
    setData(data.filter((item) => item._id !== id));
    setClozetVisibility(false);
  };
  // -------------------------------------------------------------------------
  const handleItemCreate = () => {
    setSpinner("hidden");
    setPersons(null);
    getPersons();
    setCreateItemDisplay("show");
    setShowAll("hide");
    clozetCreateUpdate("show");
  };
  // -------------------------------------------------------------------------
  const handleDisplay = (val) => {
    setCreateItemDisplay(val);
  };
  // -------------------------------------------------------------------------

  const handleShowClozet = (val) => {
    setClozetVisibility(val);
  };
  // -------------------------------------------------------------------------
  const handleRefreshData = () => {
    handleClozet();
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
        <CreateClozetItem
          display={handleDisplay}
          clozetVisible={clozetVisibility}
          showClozet={handleShowClozet}
          persons={persons}
          userName={userName}
        />
      </div>
      <div className={showAll}>
        {data
          ? data.map((item) => {
              return (
                <div key={item._id}>
                  <ClozetItem
                    remove={handleRemove}
                    data={item}
                    persons={persons}
                    refreshData={handleRefreshData}
                  />
                </div>
              );
            })
          : null}
      </div>
      <div class={spinner}>
        <div class="spinner"></div>
        <p class="message">Please wait...</p>
      </div>
    </div>
  );
};

export default Clozet;
