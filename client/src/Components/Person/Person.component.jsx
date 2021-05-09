import React from "react";
import "./Person.component.css";
import api from "../../API/api";

const Person = ({ data, remove }) => {
  // ----------- delete item ----------------------------
  const handleDeleteItem = async () => {
    const token = await localStorage.getItem("token");
    const response = await api.delete(`/persons/${data._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    remove(data._id);
  };
  // ------------------------------------------------------
  return (
    <div className="person-item-container">
      <div className="person-item-details">
        <span>Name: </span>
        {data.name}
      </div>
      <div className="person-item-buttons">
        <div className="person-item-button">Edit</div>
        <div onClick={handleDeleteItem} className="person-item-button">
          Delete
        </div>
      </div>
    </div>
  );
};

export default Person;
