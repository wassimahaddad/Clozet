import React, { useState } from "react";
import api from "../../API/api";
import ClozetItem from "../ClozetItem/ClozetItem.component";
import { sizes, seasons, items } from "../../Assets/data";

import "./CreateClozetItem.component.css";

const CreateClozetItem = ({
  userName,
  display,
  clozetVisible,
  showClozet,
  persons,
}) => {
  //   ----------------- States ------------------------------------
  const [item, setItem] = useState("Shirt");
  const [season, setSeason] = useState("Winter");
  const [size, setSize] = useState("XS");
  const [img, setImg] = useState("");
  const [data, setData] = useState([]);
  const [hideClozetItem, setHideClozetItem] = useState("hide");
  const [error, setError] = useState(null);
  const [person, setPerson] = useState(userName);
  const [spinner, setSpinner] = useState("hidden");

  //   -------------------------------------------------------------
  const checkImage = () => {
    if (!img) {
      setError("error");
    } else {
      setError(null);
    }
    console.log(error);
    console.log(img);
  };
  //   -------------------------------------------------------------

  const handleCreate = async () => {
    checkImage();
    if (img !== "") {
      setSpinner("spinner-loader");
      try {
        const formData = new FormData();
        formData.append("image", img);
        formData.append("item", item);
        formData.append("season", season);
        formData.append("size", size);
        formData.append("person", person);

        const response = await api.post("/clozets", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const arr = [];
        arr.push(response.data);
        setData(arr);
        setHideClozetItem("show");
        showClozet(true);
        console.log(response);
        setError(null);
        setSpinner("hide");
      } catch (e) {
        console.log(e.message);
        setError(e.message);
        setHideClozetItem("hide");
      }
    }
  };
  //   ------------------ refresh data afetr delete ------------------
  const handleRefreshData = async () => {
    try {
      const id = data[0]._id;
      const response = await api.get(`/clozets/${id}`);

      const arr = [];
      arr.push(response.data);
      setData(arr);
    } catch (e) {
      console.log(e);
    }
  };

  //   ---------------------cancel create --------------------------
  const handleCancel = async () => {
    display("hide");
    setHideClozetItem("hide");
    console.log(persons.filter((one) => one.name === person)[0].age_group);
  };
  //   -------------------------------------------------------------
  const handleShowClozetItem = (val) => {
    setHideClozetItem(val);
  };
  //   -------------------------------------------------------------
  const handleRemoveClozetItem = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

  // -------------------------------------------------------------
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
            readOnly={person}
            type="text"
            name="item"
            onChange={(e) => setPerson(e.target.value)}
          >
            {persons
              ? persons.map((person) => (
                  <option key={person._id}>{person.name}</option>
                ))
              : null}
          </select>
        </div>

        <div className="option-container">
          <div>Item: </div>
          <select
            readOnly={item}
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
            readOnly={size}
            type="text"
            name="1"
            onChange={(e) => setSize(e.target.value)}
          >
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
            readOnly={season}
            type="text"
            name="1"
            onChange={(e) => setSeason(e.target.value)}
          >
            {seasons.map((season) => (
              <option key={season}>{season}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="image-upload-text">Upload landscape image:</div>
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
        {clozetVisible && data
          ? data.map((elm) => (
              <div key={elm._id}>
                <ClozetItem
                  remove={handleRemoveClozetItem}
                  display={handleShowClozetItem}
                  data={elm}
                  refreshData={handleRefreshData}
                  userName={userName}
                />
              </div>
            ))
          : null}
      </div>
      <div className="create-item-error">
        {error ? "Please select image" : null}
      </div>
      <div className={spinner}>
        <div className="spinner"></div>
        <p className="message">Please wait...</p>
      </div>
    </div>
  );
};

export default CreateClozetItem;
