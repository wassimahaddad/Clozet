import React from "react-router-dom";
// import api from '../../API/api'
import "./EditUserProfile.component.css";
import { defaultAvatar } from "../../Assets/data";
// ----------------------------------------------------------------
const handleEditProfile = () => {
  console.log("edit");
};
//   --------------------------------------------------------------------------

const EditUserProfile = ({ data }) => {
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
        <div className="user-profile-buttons">
          <div onClick={handleEditProfile} className="user-profile-button">
            Edit Profile
          </div>
          <div className="user-profile-button">Delete Account</div>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
