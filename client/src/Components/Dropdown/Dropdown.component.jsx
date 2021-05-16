import React from "react";
import "./Dropdown.component.css";
const Dropdown = ({
  selection,
  setSelection,
  selectName,
  selectId,
  mapArray,
  mapCondition,
  className,
  randomKey,
}) => {
  return (
    <div className={className}>
      {" "}
      <select
        value={selection}
        onChange={(e) =>
          e.target.value === e.target.name
            ? setSelection("")
            : setSelection(e.target.value)
        }
        name={selectName}
        id={selectId}
      >
        <option value="Select person" className="clozet-search-option-title">
          Select person
        </option>
        {mapArray
          ? mapArray.map((selection) => (
              <option
                value={selection.mapCondition}
                key={selection.mapCondition}
              >
                {selection.mapCondition}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

export default Dropdown;
