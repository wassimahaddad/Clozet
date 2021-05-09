import React from "react";
import "./Person.component.css";

const Person = ({ data }) => {
  const handleDeleteItem = () => {
    console.log("delete");
  };
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
