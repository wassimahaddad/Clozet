import React, { useState } from "react";
import "./CreateClozetItem.component.css";

const CreateClozetItem = () => {
  const [item, setItem] = useState("Shirt");
  const [season, setSeason] = useState("");
  const [size, setSize] = useState("");
  const [img, setImg] = useState("");

  return (
    <div className="create-item-form-container">
      <div className="option-container">
        <select
          type="text"
          name="item"
          value={item}
          onClick={(e) => setItem(e.target.value)}
        >
          <option>Shirt</option>
          <option>Pants</option>
          <option>Dress</option>
          <option>Shoes</option>
        </select>
      </div>
      <div className="option-container">
        <select
          type="text"
          name="1"
          value={season}
          onClick={(e) => setSeason(e.target.value)}
        >
          <option>Winter</option>
          <option>Spring</option>
          <option>Summer</option>
          <option>Fall</option>
        </select>
      </div>
      <div className="option-container">
        <select
          type="text"
          name="1"
          value={size}
          onClick={(e) => setSize(e.target.value)}
        >
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
          <option>Extra Large</option>
        </select>

        <div className="image-upload-text">Image upload:</div>
        <div className="image-upload">
          <input
            type="file"
            id="item-image"
            name="item-image"
            accept="image/png, image/jpeg"
          />
        </div>

        <div className="create-item-buttons">
          <div>Cancel</div>
          <div>Create</div>
        </div>
      </div>
    </div>
  );
};

export default CreateClozetItem;
