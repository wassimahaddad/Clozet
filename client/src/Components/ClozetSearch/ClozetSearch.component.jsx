import React, { useEffect, useState } from "react";
import { seasons, sizes } from "../../Assets/data";
import api from "../../API/api";
import "./ClozetSearch.component.css";

const ClozetSearch = () => {
  const [persons, setPersons] = useState([{ name: "", age_group: "" }]);
  const [person, setPerson] = useState("");
  const sizeGroup = persons
    ? persons.filter((one) => one.name === person)
    : null;
  const sizeNames = sizeGroup.length
    ? sizeGroup[0].age_group.toLowerCase()
    : null;

  //   ----------------- load persons for person field ---------------
  useEffect(() => {
    const getPersons = async () => {
      const token = await localStorage.getItem("token");
      const response = await api.get(
        "/persons",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPersons(response.data);
    };
    getPersons();
  }, []);
  return (
    <div className="clozet-search-container">
      <div className="clozet-search-wrapper">
        <div className="clozet-search-option">
          <select
            onChange={(e) => setPerson(e.target.value)}
            name="Person"
            id="person"
          >
            <option className="clozet-search-option-title">
              Select Person
            </option>
            {persons
              ? persons.map((person) => (
                  <option key={person.name}>{person.name}</option>
                ))
              : null}
          </select>
        </div>

        <div className="clozet-search-option">
          <select name="Size" id="Size">
            <option className="clozet-search-option-title">Select Size</option>
            {sizeNames
              ? sizes[sizeNames].map((size) => (
                  <option key={size}>{size}</option>
                ))
              : null}
          </select>
        </div>

        <div className="clozet-search-option">
          <select name="Season" id="Season">
            <option className="clozet-search-option-title">
              Select Season
            </option>
            {seasons.map((season) => (
              <option key={season}>{season}</option>
            ))}
          </select>
        </div>

        <div className="clozet-search-option">
          <select name="In Stograge" id="In Stograge">
            <option className="clozet-search-option-title">
              Select Storage status
            </option>
            <option>In storage</option>
            <option>Not in storage</option>
          </select>
        </div>

        <div className="clozet-search-option">
          <select name="Keeper" id="Keeper">
            <option className="clozet-search-option-title">
              Select Keeper
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="clozet-search-button">
          <button>Search</button>
        </div>
      </div>
    </div>
  );
};

export default ClozetSearch;
