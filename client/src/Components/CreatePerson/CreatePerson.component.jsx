import React, { useState } from "react";
import api from "../../API/api";
import Person from "../Person/Person.component";
import { sizes } from "../../Assets/data";
import "./CreatePerson.component.css";

const CreatePerson = ({
  display,
  personVisible,
  showPerson,
  handlePersons,
}) => {
  // ---------------------- States -----------------------------------
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [ageGroup, setAgeGroup] = useState("baby");
  const [createdPersonVisibilty, setCreatedPersonVisibilty] = useState("hide");
  const [error, setError] = useState(null);

  // ---------------------- Create Person ----------------------------

  const handleCreate = async () => {
    try {
      const response = await api.post("/persons", {
        name,
        age_group: ageGroup,
      });
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
  // ------------------------------------------------------
  const handleRefreshData = (name, ageGroup) => {
    const temp = data ? { ...data } : {};
    temp.name = name;
    temp.age_group = ageGroup;
    setData(temp);
  };
  // ------------------------------------------------------

  const cap = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
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
        <div className="person-age-group">
          <label>Age Group</label>
          <select onChange={(e) => setAgeGroup(e.target.value)}>
            {Object.keys(sizes).map((size) => (
              <option key={size}>{cap(size)}</option>
            ))}
          </select>
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
          <Person
            remove={handleRemove}
            data={data}
            handlePerson={handleRefreshData}
          />
        ) : null}
      </div>
      <div className="create-item-error">
        {error ? "Action failed, set all fields and try again" : null}
      </div>
    </div>
  );
};

export default CreatePerson;
