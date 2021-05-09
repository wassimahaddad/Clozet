import React, { useState } from "react";
import api from "../../API/api";
// import Persons from "../Persons/Persons.component";

import "./CreatePerson.component.css";

const CreatePerson = ({ display }) => {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  //   const [hide, setHide] = useState("hide");
  //   const [error, setError] = useState(null);

  const handleCreate = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await api.post(
        "http://localhost:5000/api/persons",
        name,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
      console.log(data);

      console.log(response.data);
      //   setError(null);
    } catch (e) {
      console.log(e.message);
      //   setError(e.message);

      //   setHide("hide");
    }
  };

  const handleCancel = () => {
    display("hide");
  };

  //   -------------------------------------------------------------
  return (
    <div>
      <div className="create-person-container">
        <div className="person-name-input">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter unique name"
          />
        </div>

        <div className="create-person-buttons">
          <div onClick={handleCreate} className="create-person-button">
            Create
          </div>
          <div onClick={handleCancel} className="create-person-button">
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePerson;
