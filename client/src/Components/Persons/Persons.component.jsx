import React, { useState } from "react";
import Person from "../Person/Person.component";
import CreatePerson from "../CreatePerson/CreatePerson.component";
import api from "../../API/api";
import "./Persons.component.css";

const Persons = () => {
  const [data, setData] = useState();
  const [createItemDisplay, setCreateItemDisplay] = useState("hide");
  const [showAll, setShowAll] = useState("hide");
  // -------------------------------------------------------------------------
  const handlePersons = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await api.get("/persons", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
      console.log(response.data);
      setShowAll("show-all-persons");
      setCreateItemDisplay("hide");
    } catch (e) {
      console.log(e);
      return e.message;
    }
  };

  // // -------------------------------------------------------------------------
  const handleRemove = (id) => {
    setData(data.filter((item) => item._id !== id));
  };
  // -------------------------------------------------------------------------
  const handleCreate = () => {
    setCreateItemDisplay("show");
    setShowAll("hide");
  };
  // -------------------------------------------------------------------------
  const handleCreateItemDisplay = (val) => {
    setCreateItemDisplay(val);
  };
  // // -------------------------------------------------------------------------
  return (
    <div>
      <div className="persons-menu">
        <div onClick={handleCreate} className="persons-menu-item">
          Create
        </div>
        <div onClick={handlePersons} className="persons-menu-item">
          Show all
        </div>
      </div>

      <div className={createItemDisplay}>
        <CreatePerson display={handleCreateItemDisplay} />
      </div>
      <div className={showAll}>
        {data
          ? data.map((item) => {
              return (
                <div key={item._id}>
                  <Person remove={handleRemove} data={item} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Persons;
