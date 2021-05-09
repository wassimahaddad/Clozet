import React, { useState } from "react";
import api from "../../API/api";
import ClozetItem from "../ClozetItem/ClozetItem.component";

import "./CreateClozetItem.component.css";

const CreateClozetItem = ({ display, clozetVisible, showClozet }) => {
  const [item, setItem] = useState("Shirt");
  const [season, setSeason] = useState("Winter");
  const [size, setSize] = useState("Small");
  const [img, setImg] = useState("");
  const [data, setData] = useState("");
  const [hide, setHide] = useState("hide");
  const [error, setError] = useState(null);
  //   -------------------------------------------------------------
  const handleCancel = async () => {
    display("hide");
    setHide("hide");
  };
  //   -------------------------------------------------------------
  const handleShow = (val) => {
    setHide(val);
  };
  //   -------------------------------------------------------------
  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("image", img);
      formData.append("item", item);
      formData.append("season", season);
      formData.append("size", size);

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
      setHide("show");
      showClozet(true);
      console.log(response.data);
      setError(null);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setHide("hide");
    }
  };
  //   -------------------------------------------------------------
  const handleRemove = (id) => {
    setData(null);
    setHide("hide");
  };

  //   -------------------------------------------------------------
  return (
    <div>
      <div className="create-item-form-container">
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
      <div className={hide}>
        {clozetVisible ? (
          <ClozetItem remove={handleRemove} display={handleShow} data={data} />
        ) : null}
      </div>
      <div className="create-item-error">
        {error ? "Action failed, set all fields and try again" : null}
      </div>
    </div>
  );
};

export default CreateClozetItem;
