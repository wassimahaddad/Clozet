import React, { useEffect, useState } from "react";
import { seasons, sizes, items } from "../../Assets/data";
import api from "../../API/api";
import "./ClozetSearch.component.css";

const ClozetSearch = () => {
  const [persons, setPersons] = useState([{ name: "", age_group: "" }]);
  const [person, setPerson] = useState("");
  const [size, setSize] = useState("");
  const [item, setItem] = useState("");
  const [season, setSeason] = useState("");
  const [inStorage, setInStorage] = useState("");
  const [keeper, setKeeper] = useState("");
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
  // -------------------------------------------------------------------
  const handleSearch = () => {
    console.log("person=", person);
    console.log("size=", size);
    console.log("item=", item);
    console.log("season=", season);
    console.log("storage=", inStorage);
    console.log("keeper=", keeper);
  };
  // -------------------------------------------------------------------
  return (
    <div className="clozet-search-container">
      <div className="clozet-search-wrapper">
        <div className="clozet-search-option">
          <select
            readOnly={person}
            onChange={(e) =>
              e.target.value === e.target.name
                ? setPerson("")
                : setPerson(e.target.value)
            }
            name="Select person"
            id="person"
          >
            <option className="clozet-search-option-title">
              Select person
            </option>
            {persons
              ? persons.map((person) => (
                  <option key={person.name}>{person.name}</option>
                ))
              : null}
          </select>
        </div>

        <div className="clozet-search-option">
          <select
            name="Select item"
            id="item"
            readOnly={item}
            onChange={(e) =>
              e.target.value === e.target.name
                ? setItem("")
                : setItem(e.target.value)
            }
            className="clozet-search-option-title"
          >
            <option>Select item</option>
            {items
              ? items.map((item) => <option key={item}>{item}</option>)
              : null}
          </select>
        </div>

        <div className="clozet-search-option">
          <select
            readOnly={size}
            onChange={(e) =>
              e.target.value === e.target.name
                ? setSize("")
                : setSize(e.target.value)
            }
            name="Select size"
            id="size"
          >
            <option className="clozet-search-option-title">Select size</option>
            {sizeNames
              ? sizes[sizeNames].map((size) => (
                  <option key={size}>{size}</option>
                ))
              : null}
          </select>
        </div>

        <div className="clozet-search-option">
          <select
            name="Select season"
            id="season"
            readOnly={season}
            onChange={(e) =>
              e.target.value === e.target.name
                ? setSeason("")
                : setSeason(e.target.value)
            }
            className="clozet-search-option-title"
          >
            <option>Select season</option>
            {seasons.map((season) => (
              <option key={season}>{season}</option>
            ))}
          </select>
        </div>

        <div className="clozet-search-option">
          <select
            readOnly={inStorage}
            onChange={(e) =>
              e.target.value === e.target.name
                ? setInStorage("")
                : setInStorage(e.target.value)
            }
            name="Select Storage status"
            id="In Storage"
          >
            <option className="clozet-search-option-title">
              Select Storage status
            </option>
            <option>In storage</option>
            <option>Not in storage</option>
          </select>
        </div>

        <div className="clozet-search-option">
          <select
            readOnly={keeper}
            onChange={(e) =>
              e.target.value === e.target.name
                ? setKeeper("")
                : setKeeper(e.target.value)
            }
            name="Select Keeper"
            id="Keeper"
          >
            <option className="clozet-search-option-title">
              Select Keeper
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="clozet-search-button">
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default ClozetSearch;
