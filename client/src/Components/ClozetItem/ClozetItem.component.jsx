import React from "react";
import "./ClozetItem.component.css";
const ClozetItem = ({ data }) => {
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
          </div>
          {data ? (
            <img src={`data: image/png;base64,${data.img}`} alt="test" />
          ) : null}
        </div>
        <div className="clozet-item-buttons">
          <div className="clozet-item-button">Edit</div>
          <div className="clozet-item-button">Delete</div>
        </div>
      </div>
    </div>
  );
};

export default ClozetItem;
