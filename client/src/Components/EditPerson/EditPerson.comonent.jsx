import React, { useState } from "react";
import { ageGroups } from "../../Assets/data";
import api from "../../API/api";

import "./EditPerson.comonent.css";

const EditPerson = ({ data, editPersonVisibility, refreshData }) => {
  const [name, setName] = useState(data ? data.name : "");
  const [ageGroup, setAgeGroup] = useState(data ? data.age_group : "");

  // --------------------------------------------------------------------------
  const handleUpdate = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await api.patch(
        `/persons/${data._id}`,
        { name, age_group: ageGroup },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      editPersonVisibility();
      setName(response.data.name);
      setAgeGroup(response.data.ageGroup);
      refreshData(name, ageGroup, data._id);
    } catch (e) {
      console.log(e);
    }
  };
  // --------------------------------------------------------------------------
  const handleCancel = () => {
    console.log("Cancel");
    editPersonVisibility();
  };
  // --------------------------------------------------------------------------
  return (
    <div>
      <div className="person-editbox-container">
        <div className="person-editbox-fileds-wrapper">
          <div>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
            >
              {ageGroups.map((group) => (
                <option key={group}>{group}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="person-editbox-buttons">
          <div onClick={handleUpdate} className="person-editbox-button">
            Update
          </div>
          <div onClick={handleCancel} className="person-editbox-button">
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPerson;
