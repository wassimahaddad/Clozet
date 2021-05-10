import React, { useState } from "react";
import api from "../../API/api";
import Person from "../Person/Person.component";

import "./CreatePerson.component.css";

const CreatePerson = ({ display, personVisible, showPerson }) => {
  // ---------------------- States -----------------------------------
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [createdPersonVisibilty, setCreatedPersonVisibilty] = useState("hide");
  const [error, setError] = useState(null);

  // ---------------------- Create Person ----------------------------

  const handleCreate = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await api.post(
        "/persons",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      console.log(response.data);
      setError(null);
      showPerson(true);
      setCreatedPersonVisibilty("show");
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setCreatedPersonVisibilty("hide");
    }
  };

  //   ----------------------- Cancel Button -----------------------
  const handleCancel = () => {
    display("hide");
    setCreatedPersonVisibilty("hide");
  };

  //   ------------- Remove created/deleted from vdom --------------
  const handleRemove = () => {
    setData(null);
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
      <div className={createdPersonVisibilty}>
        {data && personVisible ? (
          <Person remove={handleRemove} data={data} />
        ) : null}
      </div>
      <div className="create-item-error">
        {error ? "Action failed, set all fields and try again" : null}
      </div>
    </div>
  );
};

export default CreatePerson;
