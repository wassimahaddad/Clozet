import React, { useState, useEffect } from "react";
import api from "../../API/api";
import ClozetItem from "../ClozetItem/ClozetItem.component";
// import Person from "../Person/Person.component";

import "./CreateClozetItem.component.css";

const CreateClozetItem = ({ display, clozetVisible, showClozet, fname }) => {
  //   ----------------- States ------------------------------------
  const [item, setItem] = useState("Shirt");
  const [season, setSeason] = useState("Winter");
  const [size, setSize] = useState("Small");
  const [img, setImg] = useState("");
  const [data, setData] = useState("");
  const [hideClozetItem, setHideClozetItem] = useState("hide");
  const [error, setError] = useState(null);
  const [person, setPerson] = useState("");
  const [persons, setPersons] = useState("");
  //   -------------------------------------------------------------
  useEffect(() => {
    const getPersons = async () => {
      const token = await localStorage.getItem("token");
      const response = await api.get(
        "http://localhost:5000/api/persons",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPersons(response.data);
      console.log(response.data);
    };
    getPersons();
  }, []);
  //   -------------------------------------------------------------
  const handleCancel = async () => {
    display("hide");
    setHideClozetItem("hide");
  };
  //   -------------------------------------------------------------
  const handleShowClozetItem = (val) => {
    setHideClozetItem(val);
  };
  //   -------------------------------------------------------------
  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("image", img);
      formData.append("item", item);
      formData.append("season", season);
      formData.append("size", size);
      formData.append("person", person);

      const token = await localStorage.getItem("token");
      const response = await api.post(
        "http://localhost:5000/api/clozets",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
      setHideClozetItem("show");
      showClozet(true);
      console.log(response.data);
      setError(null);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setHideClozetItem("hide");
    }
  };
  //   -------------------------------------------------------------
  const handleRemoveClozetItem = (id) => {
    setData(null);
    setHideClozetItem("hide");
  };

  //   -------------------------------------------------------------
  return (
    <div>
      <div className="create-item-form-container">
        {persons ? (
          <div className="option-container">
            <div>Person: </div>
            <select
              type="text"
              name="item"
              onClick={(e) => setPerson(e.target.value)}
            >
              <option>{fname}</option>
              {persons.map((person) => (
                <option key={person._id}>{person.name}</option>
              ))}
            </select>
          </div>
        ) : null}
        <div className="option-container">
          <div>Item: </div>
          <select
            type="text"
            name="item"
            onClick={(e) => setItem(e.target.value)}
          >
            <option>Shirt</option>
            <option>Pants</option>
            <option>Dress</option>
            <option>Shoes</option>
          </select>
        </div>
        <div className="option-container">
          <div>Size: </div>
          <select type="text" name="1" onClick={(e) => setSize(e.target.value)}>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
            <option>Extra Large</option>
          </select>
        </div>
        <div className="option-container">
          <div>Season: </div>
          <select
            type="text"
            name="1"
            onClick={(e) => setSeason(e.target.value)}
          >
            <option>Winter</option>
            <option>Spring</option>
            <option>Summer</option>
            <option>Fall</option>
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
            <div onClick={handleCreate} className="create-item-button">
              Create
            </div>
            <div onClick={handleCancel} className="create-item-button">
              Cancel
            </div>
          </div>
        </div>
      </div>
      <div className={hideClozetItem}>
        {clozetVisible ? (
          <ClozetItem
            remove={handleRemoveClozetItem}
            display={handleShowClozetItem}
            data={data}
          />
        ) : null}
      </div>
      <div className="create-item-error">
        {error ? "Action failed, set all fields and try again" : null}
      </div>
    </div>
  );
};

export default CreateClozetItem;
