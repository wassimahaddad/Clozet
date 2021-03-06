import React, { useEffect, useState } from "react";
import { seasons, sizes, allSizes, items } from "../../Assets/data";
import api from "../../API/api";
import ClozetItem from "../ClozetItem/ClozetItem.component";
import "./ClozetSearch.component.css";

const ClozetSearch = ({
  showSearchBox,
  hideSearchBox,
  searchResultsVisibilty,
  setSearchResultsVisibilty,
}) => {
  const [persons, setPersons] = useState([{ name: "", age_group: "" }]);
  const [person, setPerson] = useState("");
  const [size, setSize] = useState("");
  const [item, setItem] = useState("");
  const [season, setSeason] = useState("");
  const [inStorage, setInStorage] = useState("");
  const [keeper, setKeeper] = useState("");
  const [data, setData] = useState("");
  const [spinner, setSpinner] = useState("hidden");
  const [message, setMessage] = useState(null);
  const [messageVisibility, setMessageVisibility] = useState("hide");
  const sizeGroup = persons
    ? persons.filter((one) => one.name === person)
    : null;
  const sizeNames = sizeGroup.length
    ? sizeGroup[0].age_group.toLowerCase()
    : null;

  //   ----------------- load persons for person field ---------------
  useEffect(() => {
    const getPersons = async () => {
      try {
        const response = await api.get("/persons");
        setPersons(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getPersons();
  }, []);

  // -------------------------------------------------------------------
  const handleSearch = async () => {
    try {
      setSpinner("page-loader");
      hideSearchBox("hide");
      setMessage(null);

      const response = await api.post("/clozets/search", {
        person,
        size,
        item,
        season,
        in_storage: inStorage,
        keeper,
      });
      console.log(response.data);
      setSpinner("hide");
      setData(response.data);
      setSearchResultsVisibilty();

      setPerson("");
      setItem("");
      setSize("");
      setSeason("");
      setInStorage("");
      setKeeper("");

      if (response.data.length === 0) {
        setMessage("no match found");
        setMessageVisibility("create-item-message-visibility");
        console.log(message);
      } else {
        setMessage(null);
        setMessageVisibility("hide");
        console.log(message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  // -------------------------------------------------------------------
  const handleRefreshData = (val) => {
    let newData = data;
    const index = newData.findIndex((id) => id._id === val._id);
    newData[index] = val;
    setData(null);
    setData(newData);
    console.log(data[index]);
  };
  // -------------------------------------------------------------------

  const handleRemoveClozetItem = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

  // -------------------------------------------------------------------

  return (
    <div className="clozet-search-container">
      {showSearchBox === "hide" ? (
        <div className={messageVisibility}>{message}</div>
      ) : null}
      <div className={showSearchBox}>
        <div className="clozet-search-option">
          <select
            value={person}
            onChange={(e) =>
              e.target.value === e.target.name
                ? setPerson("")
                : setPerson(e.target.value)
            }
            name="Select person"
            id="person"
          >
            <option
              value="Select person"
              className="clozet-search-option-title"
            >
              Select person
            </option>
            {persons
              ? persons.map((person) => (
                  <option value={person.name} key={person.name}>
                    {person.name}
                  </option>
                ))
              : null}
          </select>
        </div>

        <div className="clozet-search-option">
          <select
            name="Select item"
            id="item"
            value={item}
            onChange={(e) =>
              e.target.value === e.target.name
                ? setItem("")
                : setItem(e.target.value)
            }
          >
            <option className="clozet-search-option-title" value="Select item">
              Select item
            </option>
            {items
              ? items.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))
              : null}
          </select>
        </div>

        <div className="clozet-search-option">
          <select
            value={size}
            onChange={(e) =>
              e.target.value === e.target.name
                ? setSize("")
                : setSize(e.target.value)
            }
            name="Select size"
            id="size"
          >
            <option value="Select size" className="clozet-search-option-title">
              Select size
            </option>
            {sizeNames
              ? sizes[sizeNames].map((size) => (
                  <option value={size} key={size}>
                    {size}
                  </option>
                ))
              : allSizes.map((size) => (
                  <option value={size} key={size}>
                    {size}
                  </option>
                ))}
          </select>
        </div>

        <div className="clozet-search-option">
          <select
            name="Select season"
            id="season"
            value={season}
            onChange={(e) =>
              e.target.value === e.target.name
                ? setSeason("")
                : setSeason(e.target.value)
            }
          >
            <option
              className="clozet-search-option-title"
              value="Select season"
            >
              Select season
            </option>
            {seasons.map((season) => (
              <option value={season} key={season}>
                {season}
              </option>
            ))}
          </select>
        </div>

        <div className="clozet-search-option">
          <select
            value={inStorage}
            onChange={(e) =>
              e.target.value === e.target.name
                ? setInStorage(false)
                : e.target.value === "In storage"
                ? setInStorage(true)
                : setInStorage(false)
            }
            name="Select Storage status"
            id="In Storage"
          >
            <option
              value="Select Storage status"
              className="clozet-search-option-title"
            >
              Select Storage status
            </option>
            <option value="In storage">In storage</option>
            <option value="Not in storage">Not in storage</option>
          </select>
        </div>

        <div className="clozet-search-option">
          <select
            value={keeper}
            onChange={(e) =>
              e.target.value === e.target.name
                ? setKeeper(true)
                : e.target.value === "Yes"
                ? setKeeper(true)
                : setKeeper(false)
            }
            name="Select Keeper"
            id="Keeper"
          >
            <option
              value="Select Keeper"
              className="clozet-search-option-title"
            >
              Select Keeper
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="clozet-search-button">
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className={searchResultsVisibilty}>
        {data
          ? data.map((item) => {
              return (
                <React.Fragment key={item._id}>
                  <ClozetItem
                    remove={handleRemoveClozetItem}
                    data={item}
                    persons={persons}
                    refreshData={handleRefreshData}
                  />
                </React.Fragment>
              );
            })
          : null}
      </div>
      <div className={spinner}>
        <div className="spinner"></div>
        <p className="message">Please wait...</p>
      </div>
    </div>
  );
};

export default ClozetSearch;
