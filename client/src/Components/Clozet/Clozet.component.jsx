import React, { useState } from "react";
import CreateClozetItem from "../CreateClozetItem.component/CreateClozetItem.component";
import ClozetSearch from "../ClozetSearch/ClozetSearch.component";
import api from "../../API/api";
import "./Clozet.component.css";

const Clozet = ({ userName, clozetCreateUpdate }) => {
  const [createItemDisplay, setCreateItemDisplay] = useState("hide");
  const [clozetVisibility, setClozetVisibility] = useState(true);
  const [persons, setPersons] = useState();
  const [clozetSearchVisibilty, setClozetSearchVisibilty] = useState("hide");
  const [showSearchBox, setShowSearchBox] = useState("clozet-search-wrapper");
  const [searchResultsVisibilty, setSearchResultsVisibility] = useState("hide");

  // -------------------------------------------------------------------------

  const getPersons = async () => {
    try {
      const response = await api.get("/persons");

      setPersons(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // // -------------------------------------------------------------------------

  const handleItemCreate = () => {
    setPersons(null);
    getPersons();
    setCreateItemDisplay("show");
    clozetCreateUpdate("show");
    setClozetSearchVisibilty("hide");
    setClozetVisibility(false);
  };
  // -------------------------------------------------------------------------
  const handleDisplay = (val) => {
    setCreateItemDisplay(val);
  };
  // -------------------------------------------------------------------------

  const handleShowClozet = (val) => {
    setClozetVisibility(val);
  };

  // -------------------------------------------------------------------------
  const handleSearch = () => {
    setPersons(null);
    getPersons();
    setCreateItemDisplay("hide");
    setClozetSearchVisibilty("clozet-search-container");
    setShowSearchBox("clozet-search-wrapper");
    setSearchResultsVisibility("hide");
  };
  // -------------------------------------------------------------------------
  const handleHideSearchBox = () => {
    setShowSearchBox("hide");
  };
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  const handleSearchResultsVisibilty = () => {
    setSearchResultsVisibility("search-results-show");
  };
  // -------------------------------------------------------------------------

  return (
    <div>
      <div className="clozet-menu">
        <div className="clozet-menu-item" onClick={handleItemCreate}>
          Create
        </div>
        <div className="clozet-menu-item" onClick={handleSearch}>
          Search
        </div>
      </div>

      <div className={createItemDisplay}>
        <CreateClozetItem
          display={handleDisplay}
          clozetVisible={clozetVisibility}
          showClozet={handleShowClozet}
          persons={persons}
          userName={userName}
        />
      </div>

      <div className={clozetSearchVisibilty}>
        <ClozetSearch
          showSearchBox={showSearchBox}
          hideSearchBox={handleHideSearchBox}
          searchResultsVisibilty={searchResultsVisibilty}
          setSearchResultsVisibilty={handleSearchResultsVisibilty}
        />
      </div>
    </div>
  );
};

export default Clozet;
