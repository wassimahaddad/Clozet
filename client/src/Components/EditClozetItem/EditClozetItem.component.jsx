import React, { useState, useEffect } from "react";
import api from "../../API/api";
import "./EditClozetItem.component.css";
import { seasons, items, sizes } from "../../Assets/data";

const UpdateClozetItem = ({ data, cancelEdit, refreshData, userName }) => {
  //   ----------------- States ------------------------------------
  const [item, setItem] = useState("Shirt");
  const [season, setSeason] = useState("Winter");
  const [size, setSize] = useState(data.size);
  const [img, setImg] = useState("");
  const [inStorage, setInStorage] = useState("");
  const [keeper, setKeeper] = useState("");
  const [spinner, setSpinner] = useState("hide");
  const [error, setError] = useState(null);
  const [person, setPerson] = useState(data.person);
  const [persons, setPersons] = useState([{ name: "", age_group: "" }]);

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
    return function cleanup() {
      setPersons([{ name: "", age_group: "" }]);
    };
  }, []);

  //   ---------------------- Update selected item ----------------------
  const handleUpdate = async () => {
    setSpinner("show");
    try {
      const formData = new FormData();
      formData.append("image", img);
      formData.append("item", item);
      formData.append("season", season);
      formData.append("size", size);
      formData.append("person", person);
      formData.append("in_storage", inStorage === "Yes");
      formData.append("keeper", keeper === "Yes");

      const token = await localStorage.getItem("token");
      const response = await api.patch(`/clozets/${data._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setError(null);
      cancelEdit("hide");
      refreshData(response.data);
      setSpinner("hide");
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };

  const handleCancel = async () => {
    cancelEdit("hide");
    console.log("storage=", inStorage);
    console.log("keeper=", keeper);
    setInStorage(data.in_storage ? "Yes" : "No");
    setKeeper(data.keeper ? "Yes" : "No");
  };
  //   ----------- customize size dropdown -----------------------
  const sizeGroup = persons
    ? persons.filter((one) => one.name === person)
    : null;
  const sizeNames = sizeGroup.length
    ? sizeGroup[0].age_group.toLowerCase()
    : null;

  // -------------------------------------------------------------------------
  return (
    <div>
      <div className="create-item-form-container">
        <div className="option-container">
          <div>Person: </div>
          <select
            readOnly={data.person}
            type="text"
            name="person"
            onChange={(e) => setPerson(e.target.value)}
          >
            <option key={data._id}>{data.person}</option>
            {persons
              ? persons
                  .filter((person) => person.name !== data.person)
                  .map((person) => (
                    <option key={person.name}>{person.name}</option>
                  ))
              : null}
          </select>
        </div>

        <div className="option-container">
          <div>Item: </div>
          <select
            defaultValue={data.item}
            type="text"
            name="item"
            onChange={(e) => setItem(e.target.value)}
          >
            {items.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="option-container">
          <div>Size: </div>
          <select
            defaultValue={data.size}
            // defaultValue={(e) => setSize(e.target.value)}
            readOnly={size}
            type="text"
            name="size"
            onChange={(e) => setSize(e.target.value)}
          >
            <option key="choose-size">Size</option>
            {sizeNames
              ? sizes[sizeNames].map((size) => (
                  <option key={size}>{size}</option>
                ))
              : null}
          </select>
        </div>
        <div className="option-container">
          <div>Season: </div>
          <select
            defaultValue={data.season}
            type="text"
            name="season"
            onChange={(e) => setSeason(e.target.value)}
          >
            {seasons.map((season) => (
              <option key={season}>{season}</option>
            ))}
          </select>
        </div>
        <div className="option-container">
          <div>In Storage: </div>
          <select
            defaultValue={data.in_storage ? "Yes" : "No"} //------
            type="text"
            name="In Storage"
            onChange={(e) => setInStorage(e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="option-container">
          <div>Keeper: </div>
          <select
            defaultValue={data.keeper ? "Yes" : "No"} //------
            type="text"
            name="keeper"
            onChange={(e) => setKeeper(e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <div className="image-upload-text">Upload landscape image :</div>
          <div className="image-upload">
            <input
              onChange={(e) => setImg(e.target.files[0])}
              type="file"
              id="item-image"
              name="item-image"
              accept="image/png, image/jpeg"
            />
          </div>

          <div className="create-item-buttons">
            <div onClick={handleUpdate} className="create-item-button">
              Update
            </div>
            <div onClick={handleCancel} className="create-item-button">
              Cancel
            </div>
          </div>
        </div>
      </div>
      <div className="create-item-error">
        {error ? "Action failed, set all fields and try again" : null}
      </div>
      <div className={spinner}>
        <div className="spinner"></div>
        <p className="message">Please wait...</p>
      </div>
    </div>
  );
};

export default UpdateClozetItem;
