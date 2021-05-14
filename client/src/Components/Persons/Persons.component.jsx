import React, { useState } from "react";
import Person from "../Person/Person.component";
import CreatePerson from "../CreatePerson/CreatePerson.component";
import api from "../../API/api";
import "./Persons.component.css";

const Persons = ({ userName }) => {
  const [data, setData] = useState();
  const [createItemDisplay, setCreateItemDisplay] = useState("hide");
  const [showAll, setShowAll] = useState("hide");
  const [personVisibility, setPersonVisibility] = useState(true);

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
    setPersonVisibility(false);
  };
  // -------------------------------------------------------------------------
  const handleCreate = () => {
    setShowAll("hide");
    setCreateItemDisplay("show");
  };
  // -------------------------------------------------------------------------
  const handleCreateItemDisplay = (val) => {
    setCreateItemDisplay(val);
  };

  // -------------------------------------------------------------------------
  const handleShowPerson = (val) => {
    setPersonVisibility(val);
  };

  // -------------------------------------------------------------------------
  const handlePerson = (n, ag, id) => {
    const findById = data.filter((item) => item._id === id);
    const index = data.indexOf(findById[0]);
    let temp = [...data];
    temp[index].name = n;
    temp[index].age_group = ag;
    setData(null);
    setData(temp);
  };
  // -------------------------------------------------------------------------
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
        <CreatePerson
          display={handleCreateItemDisplay}
          personVisible={personVisibility}
          showPerson={handleShowPerson}
          handlePersons={handlePersons}
        />
      </div>
      <div className={showAll}>
        {data
          ? data.map((item) => {
              return (
                <div key={item._id}>
                  <Person
                    remove={handleRemove}
                    data={item}
                    userName={userName}
                    handlePerson={handlePerson}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Persons;
