import React, { useState } from "react";

import api from "../../API/api";
import "./People.component.css";

const People = () => {
  // const [data, setData] = useState();
  // const [createItemDisplay, setCreateItemDisplay] = useState("hide");
  // const [showAll, setShowAll] = useState("hide");
  // // -------------------------------------------------------------------------
  // const handleClozet = async () => {
  //   try {
  //     const token = await localStorage.getItem("token");
  //     const response = await api.get("/wardrobes", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     setData(response.data);
  //     console.log(response.data);
  //     setShowAll("show-all-items");
  //     setCreateItemDisplay("hide");
  //   } catch (e) {
  //     console.log(e);
  //     return e.message;
  //   }
  // };

  // // -------------------------------------------------------------------------
  // const handleRemove = (id) => {
  //   setData(data.filter((item) => item._id !== id));
  // };
  // // -------------------------------------------------------------------------
  // const handleItemCreate = () => {
  //   setCreateItemDisplay("show");
  //   setShowAll("hide");
  // };
  // // -------------------------------------------------------------------------
  // const handleDisplay = (val) => {
  //   setCreateItemDisplay(val);
  // };
  // // -------------------------------------------------------------------------
  return (
    <div>
      <div className="People-menu">
        <div className="People-menu-item" onClick={handleItemCreate}>
          Create
        </div>
        <div className="People-menu-item" onClick={handlePeople}>
          Search
        </div>
        <div className="People-menu-item" onClick={handlePeople}>
          Show all
        </div>
      </div>
      {/* 
      <div className={createItemDisplay}>
        <CreatePerson display={handleDisplay} />
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
      </div> */}
    </div>
  );
};

export default People;
