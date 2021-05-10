import React, { useState, useEffect } from "react";
import api from "../../API/api";
import "./EditClozetItem.component.css";

const UpdateClozetItem = ({ details, cancelEdit }) => {
  //   ----------------- States ------------------------------------
  const [item, setItem] = useState("Shirt");
  const [season, setSeason] = useState("Winter");
  const [size, setSize] = useState("Small");
  const [img, setImg] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const [person, setPerson] = useState("");
  const [persons, setPersons] = useState("");

  //   const [hideClozetItem, setHideClozetItem] = useState("hide");

  //   -------------------------------------------------------------
  const handleCancel = async () => {
    cancelEdit("hide");
    console.log("cancel");
    console.log(details);
  };
  //   -------------------------------------------------------------
  //   const handleShowClozetItem = (val) => {
  //     setHideClozetItem(val);
  //   };
  //   -------------------------------------------------------------
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

  //   -------------------------------------------------------------
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("image", img);
      formData.append("item", item);
      formData.append("season", season);
      formData.append("size", size);
      formData.append("person", person);

      const token = await localStorage.getItem("token");
      const response = await api.patch("/clozets", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data);
      //   setHideClozetItem("show");
      //   showClozet(true);
      console.log(response.data);
      console.log(data);
      setError(null);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      //   setHideClozetItem("hide");
    }
  };
  //   -------------------------------------------------------------
  // const handleRemoveClozetItem = (id) => {
  //   // setData(null);
  //   // setHideClozetItem("hide");
  // };

  //   -------------------------------------------------------------
  const items = ["Shirt", "Pants", "Dress", "Shoes"];
  const sizes = ["Small", "Large", "XL", "XXL"];
  const seasons = ["Winter", "Spring", "Summer", "Fall"];
  //   -------------------------------------------------------------
  return (
    <div>
      <div className="create-item-form-container">
        <div className="option-container">
          <div>Person: </div>
          <select
            type="text"
            name="item"
            onClick={(e) => setPerson(e.target.value)}
          >
            <option>{details.person}</option>
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
            defaultValue={details.item}
            type="text"
            name="item"
            onClick={(e) => setItem(e.target.value)}
          >
            {items.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="option-container">
          <div>Size: </div>
          <select
            defaultValue={details.size}
            type="text"
            name="1"
            onClick={(e) => setSize(e.target.value)}
          >
            {sizes.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </div>
        <div className="option-container">
          <div>Season: </div>
          <select
            defaultValue={details.season}
            type="text"
            name="1"
            onClick={(e) => setSeason(e.target.value)}
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
