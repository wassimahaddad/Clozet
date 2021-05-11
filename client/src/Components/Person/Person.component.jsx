import React, { useState } from "react";
import "./Person.component.css";
import api from "../../API/api";

const Person = ({ data, remove, userName }) => {
  const [enableDisable, setEnableDisable] = useState("person-item-button");
  // ----------- delete item ----------------------------
  const handleDeleteItem = async () => {
    if (data.name !== userName) {
      setEnableDisable("person-item-button");
      const token = await localStorage.getItem("token");
      const response = await api.delete(`/persons/${data._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      remove(data._id);
    } else {
      setEnableDisable("person-item-button-disabled");
    }
  };
  // ------------------------------------------------------
  return (
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
        <div className="person-item-button">Edit</div>
        <div onClick={handleDeleteItem} className={enableDisable}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default Person;
