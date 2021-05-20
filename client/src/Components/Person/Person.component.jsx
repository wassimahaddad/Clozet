import React, { useState } from "react";
import "./Person.component.css";
import api from "../../API/api";
import EditPerson from "../EditPerson/EditPerson.comonent";

const Person = ({ data, remove, userName, handlePerson }) => {
  const [enableDisable, setEnableDisable] = useState("person-item-button");
  const [editPersonVisibility, setEditPersonVisibility] = useState("hide");
  // ----------- delete item ----------------------------
  const handleDeleteItem = async () => {
    try {
      if (data.name !== userName) {
        setEnableDisable("person-item-button");
        const response = await api.delete(`/persons/${data._id}`);
        console.log(response);
        remove(data._id);
      } else {
        setEnableDisable("person-item-button-disabled");
      }
    } catch (e) {
      console.log(e);
    }
  };
  // ------------------------------------------------------
  const handleEditItem = () => {
    console.log("edit");

    setEditPersonVisibility("person-item-edit");
  };
  // ------------------------------------------------------
  const HandleditPersonVisibility = () => {
    setEditPersonVisibility("hide");
  };
  // ------------------------------------------------------
  const handleRefreshData = (name, ageGroup, id) => {
    handlePerson(name, ageGroup, id);
  };
  // ------------------------------------------------------
  return (
    <div>
      <div className="person-item-container">
        <div className="person-item-details">
          <span>Name: </span>
          {data.name}
        </div>
        <div className="person-item-details">
          <span>Age Group: </span>
          {data.age_group}
        </div>
        <div className="person-item-buttons">
          <div onClick={handleEditItem} className="person-item-button">
            Edit
          </div>
          <div onClick={handleDeleteItem} className={enableDisable}>
            Delete
          </div>
        </div>
      </div>
      <div className={editPersonVisibility}>
        <EditPerson
          data={data}
          editPersonVisibility={HandleditPersonVisibility}
          refreshData={handleRefreshData}
          userName={userName}
        />
      </div>
    </div>
  );
};

export default Person;
