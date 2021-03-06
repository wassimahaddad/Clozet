import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./EditUserProfile.component.css";
import { defaultAvatar } from "../../Assets/data";
import api from "../../API/api";

const EditUserProfile = ({ data, refreshData }) => {
  const [subSelectionContainer, setSubSelectionContainer] = useState("hide");
  const [editButtons, setEditButtons] = useState("user-profile-buttons");
  const [updateButtons, setUpdateButtons] = useState("hide");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [delPhotoBtn, setDelPhotoBtn] = useState("hide");
  const [areYouSure, setAreYouSure] = useState("hide");
  const history = useHistory();
  // ----------------------------------------------------------------
  const handleEditProfile = () => {
    refreshData();
    setEditButtons("hide");
    setUpdateButtons("user-profile-buttons");
    setSubSelectionContainer("user-profile-edit-subselection");
    setFName(data.first_name);
    setLName(data.last_name);
    setEmail(data.email);
    setDelPhotoBtn("user-photo-delete-button");
  };

  //--------------------------------------------------------------------------
  const handleUpateProfile = async () => {
    if (
      (newPassword.length > 6 || newPassword.length === 0) &&
      newPassword === confirmPassword
    ) {
      try {
        console.log(newPassword);

        const response = await api.patch(`/users/me`, {
          first_name: fname,
          last_name: lname,
          email: email,
          password: newPassword,
        });
        console.log(response);

        if (img !== "") {
          try {
            const formData = new FormData();
            formData.append("avatar", img);
            const response = await api.post(`/users/me/avatar`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            console.log(response.data);
            setDelPhotoBtn("user-photo-delete-button");
          } catch (e) {
            console.log(e);
          }
        }
        setMessage("Done!");
      } catch (e) {
        console.log(e);
        setMessage(e.message);
      }
      refreshData();
    } else setMessage("Passwords don't match or less than 7 characters");
  };
  //   --------------------------------------------------------------------------
  const handleCancel = () => {
    setEditButtons("user-profile-buttons");
    setUpdateButtons("hide");
    setSubSelectionContainer("hide");
  };
  //   --------------------------------------------------------------------------
  const handleDeletePhoto = async () => {
    try {
      const response = await api.delete(`/users/me/avatar`);

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }

    refreshData();
  };
  //   --------------------------------------------------------------------------

  const handleAreYouSure = () => {
    setAreYouSure("are-you-sure");
  };
  //   --------------------------------------------------------------------------
  const handleDeleteAccount = async () => {
    console.log("del");
    setAreYouSure("hide");
    try {
      const response = await api.delete(`/users/me`);

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
    localStorage.clear();
    history.push("/");
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
            <div onClick={handleDeletePhoto}>
              {data.avatar ? (
                <div className={delPhotoBtn}>Delete Photo</div>
              ) : null}
            </div>
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
        <div className={subSelectionContainer}>
          <div className="user-profile-edit-name">
            <input
              value={fname}
              placeholder="first name"
              onChange={(e) => setFName(e.target.value)}
              type="text"
            />
            <input
              value={lname}
              placeholder="last name"
              onChange={(e) => setLName(e.target.value)}
              type="text"
            />
          </div>
          <div className="user-profile-edit-email">
            <input
              type="email"
              value={email}
              placeholder="email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="user-profile-edit-password">
            <input
              type="password"
              placeholder="new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="user-profile-edit-image">
            <label>Upload profile photo</label>
            <input
              onChange={(e) => setImg(e.target.files[0])}
              type="file"
              id="profile-image"
              name="profile-image"
              accept="image/png, image/jpeg"
            />
          </div>
          <div className="update-error-messages">{message}</div>
        </div>

        <div className={editButtons}>
          <div onClick={handleEditProfile} className="user-profile-button">
            Edit Profile
          </div>
          <div onClick={handleAreYouSure} className="user-profile-button">
            Delete Account
          </div>
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
      <div className={areYouSure}>
        <div className="delete-account-warning">
          Deleting your account will delete all stored data, please confirm or
          cancel
        </div>
        <div className="are-you-sure-wrapper">
          <div className="are-you-sure-button" onClick={handleDeleteAccount}>
            Confirm
          </div>
          <div
            className="are-you-sure-button"
            onClick={() => setAreYouSure("hide")}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
