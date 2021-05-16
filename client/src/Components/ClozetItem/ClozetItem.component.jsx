import React, { useState } from "react";
import "./ClozetItem.component.css";
import api from "../../API/api";
import EditClozetItem from "../EditClozetItem/EditClozetItem.component";

const ClozetItem = ({ userName, data, remove, refreshData, defaultPerson }) => {
  const [showEdit, setShowEdit] = useState("hide");
  // --------------------- Delete Item ------------------------------------------
  const handleDeleteItem = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await api.delete(`/clozets/${data._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      remove(data._id);
    } catch (e) {
      console.log(e);
    }
  };
  // ----------------------- Edit Item -------------------------------------------
  const handleEditItem = () => {
    setShowEdit("clozet-edit-window ");
  };

  // ------------------------------------------------------------------------------
  const handleCancelEdit = (val) => {
    setShowEdit(val);
  };
  // ------------------------------------------------------------------------------

  return (
    <div>
      <div className="clozet-item-container">
        <div className="clozet-item-wrapper">
          <div className="clozet-item-details">
            <div className="clozet-item-details-line">
              {data ? (
                <>
                  <span>Item:</span> {data.item}
                </>
              ) : null}
            </div>

            <div className="clozet-item-details-line">
              {data ? (
                <>
                  <span>Size:</span> {data.size}
                </>
              ) : null}
            </div>
            <div className="clozet-item-details-line">
              {data ? (
                <>
                  <span>Season:</span> {data.season}
                </>
              ) : null}
            </div>
            <div className="clozet-item-details-line">
              {data ? (
                <>
                  <span>In storage:</span> {data.in_storage ? "Yes" : "No"}
                </>
              ) : null}
            </div>
            <div className="clozet-item-details-line">
              {data ? (
                <>
                  <span>Keeper:</span> {data.keeper ? "Yes" : "No"}
                </>
              ) : null}
            </div>
            <div className="clozet-item-details-line">
              {data ? (
                <>
                  <span>Person:</span> {data.person}
                </>
              ) : null}
            </div>
          </div>
          {data ? (
            <img src={`data: image/png;base64,${data.img}`} alt="test" />
          ) : null}
        </div>
        <div className="clozet-item-buttons">
          <div onClick={handleEditItem} className="clozet-item-button">
            Edit
          </div>
          <div onClick={handleDeleteItem} className="clozet-item-button">
            Delete
          </div>
        </div>
      </div>
      <div className={showEdit}>
        <EditClozetItem
          data={data}
          cancelEdit={handleCancelEdit}
          refreshData={refreshData}
          userName={userName}
        />
      </div>
    </div>
  );
};

export default ClozetItem;
