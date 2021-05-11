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
  const [error, setError] = useState(null);
  const [person, setPerson] = useState(data.person);
  const [persons, setPersons] = useState("");

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

  //   ---------------------- Update selected item ----------------------
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("image", img);
      formData.append("item", item);
      formData.append("season", season);
      formData.append("size", size);
      formData.append("person", person);

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
      refreshData();
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };

  const handleCancel = async () => {
    cancelEdit("hide");
  };

  //   ----------- customize size dropdown -----------------------
  const sizeNames = persons
    ? persons.filter((one) => one.name === person)[0].age_group.toLowerCase()
    : null;

  //   -------------------------------------------------------------
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
            <option>{data.person}</option>
            {persons
              ? persons
                  .filter((person) => person.name !== data.person)
                  .map((person) => (
                    <option key={person._id}>{person.name}</option>
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
            defaultValue={(e) => setSize(e.target.value)}
            readOnly={size}
            type="text"
            name="size"
            onChange={(e) => setSize(e.target.value)}
          >
            <option>Choose size</option>
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

        <div>
          <div className="image-upload-text">Image upload:</div>
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
    </div>
  );
};

export default UpdateClozetItem;
