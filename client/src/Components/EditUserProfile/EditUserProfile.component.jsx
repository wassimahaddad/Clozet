import React, { useState } from "react";
// import api from '../../API/api'
import "./EditUserProfile.component.css";
import { defaultAvatar } from "../../Assets/data";

const EditUserProfile = ({ data }) => {
  const [editFields, setEditFileds] = useState("hide");
  const [editAction, setEditAction] = useState("");
  const [subSelection, setSubSelection] = useState(null);
  const [editButtons, setEditButtons] = useState("user-profile-buttons");
  const [updateButtons, setUpdateButtons] = useState("hide");

  // ----------------------------------------------------------------
  const handleEditProfile = () => {
    setEditFileds("user-profile-edit-fileds");
    setEditButtons("hide");
    setUpdateButtons("user-profile-buttons");
  };
  //   --------------------------------------------------------------------------
  const hadleSelection = () => {
    switch (editAction) {
      case "Edit name":
        setSubSelection(
          <div>
            <input type="text" placeholder="first name" />
            <input type="text" placeholder="last name" />
          </div>
        );
        break;
      case "Edit email":
        setSubSelection(
          <div>
            <input type="email" placeholder="email address" />
          </div>
        );
        break;
      case "Edit password":
        setSubSelection(
          <div>
            <input type="password" placeholder="password" />
            <input type="password" placeholder="confirm password" />
          </div>
        );
        break;
      case "Edit profile image":
        setSubSelection(
          <div>
            <input type="file" />
          </div>
        );
        break;
      default:
        setSubSelection(null);
    }
  };
  //   --------------------------------------------------------------------------
  const handleUpateProfile = () => {
    console.log("update");
  };
  //   --------------------------------------------------------------------------
  const handleCancel = () => {
    console.log("cancel");
    setEditFileds("hide");
    setEditButtons("user-profile-buttons");
    setUpdateButtons("hide");
  };
  //   --------------------------------------------------------------------------
  return (
    <div>
      <div className="user-profile-container">
        <div className="user-profile-wrapper">
          <div className="user-profile-avatar">
            <img
              src={
                data
                  ? `data: image/png;base64,${
                      data.avatar ? data.avatar : defaultAvatar
                    }`
                  : null
              }
              alt="user avatar"
            />
          </div>
          <div className="user-details-wrapper">
            <div className="user-details-cat">Name:</div>
            <div className="user-detail">{`${
              data ? `${data.first_name} ${data.last_name}` : null
            }`}</div>
            <div className="user-details-cat">Email</div>
            <div className="user-detail">{data ? data.email : null}</div>
          </div>
        </div>
        <div className={editFields}>
          <select
            value={editAction}
            onChange={(e) => setEditAction(e.target.value)}
            onClick={hadleSelection}
          >
            <option>Choose Action</option>
            <option>Edit name</option>
            <option>Edit email</option>
            <option>Edit password</option>
            <option>Edit profile image</option>
          </select>
          <div>{subSelection}</div>
        </div>
        <div className={editButtons}>
          <div onClick={handleEditProfile} className="user-profile-button">
            Edit Profile
          </div>
          <div className="user-profile-button">Delete Account</div>
        </div>
        <div className={updateButtons}>
          <div onClick={handleUpateProfile} className="user-profile-button">
            Update
          </div>
          <div onClick={handleCancel} className="user-profile-button">
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
