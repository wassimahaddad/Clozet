import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../API/api";
import "./User.page.css";
import Clozet from "../../Components/Clozet/Clozet.component";

const User = () => {
  const [data, setData] = useState();
  const [menu, setMenu] = useState("hide");
  const [clozet, setClozet] = useState("hide");
  const [traingle, setTriangle] = useState(<span>&#9660;</span>);
  const history = useHistory();
  // --------------------- Restrict access when not logged in --------
  useEffect(() => {
    const page = async () => {
      const token = await localStorage.getItem("token");
      if (!token) history.push("/");
    };
    page();
    handleUserProfile();
  }, [history]);
  // --------------------- user profile ---------------------------------------
  const handleUserProfile = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(response.data);
    } catch (e) {
      console.log(e);
      return e.message;
    }
  };
  // --------------------- logout ---------------------------------------
  const handleLogout = async () => {
    try {
      const token = await localStorage.getItem("token");

      await api.post(
        "/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      history.push("/");
    } catch (e) {
      console.log(e);
      return e.message;
    }
  };

  // ---------------------------------------------------------------------
  const handleMenu = () => {
    if (menu === "hide") {
      setMenu("profile-menu");
      setTriangle(<span>&#9654;</span>);
    } else {
      setMenu("hide");
      setTriangle(<span>&#9660;</span>);
    }
  };
  // ---------------------------------------------------------------------
  const handleClozet = () => {
    setClozet("show");
    setMenu("hide");
  };
  // ---------------------------------------------------------------------
  return (
    <div>
      <div className={menu}>
        <div className="menu-option">My profile</div>
        <div className="menu-option">People</div>
        <div onClick={handleClozet} className="menu-option">
          clozet
        </div>
        <div onClick={handleLogout} className="menu-option">
          Logout
        </div>
      </div>
      <div className="user-navbar">
        <div onClick={handleMenu} className="user-menu-triangle">
          {traingle}
        </div>

        <div className="user-avatar">
          {data ? (
            <>
              <img src={`data: image/png;base64,${data.avatar}`} alt="test" />
            </>
          ) : null}
        </div>
        <div className="user-display-name">
          {data ? `${data.first_name} ${data.last_name}` : null}
        </div>
      </div>
      <div className={clozet}>
        <Clozet />
      </div>
    </div>
  );
};

export default User;
