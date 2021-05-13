import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import api from "../../API/api";
import "./User.page.css";
import Clozet from "../../Components/Clozet/Clozet.component";
import Persons from "../../Components/Persons/Persons.component";

const User = () => {
  const [data, setData] = useState();
  const [menu, setMenu] = useState("hide");
  const [clozet, setClozet] = useState("hide");
  const [persons, setPersons] = useState("hide");
  const [traingle, setTriangle] = useState(<span>&#9660;</span>);
  const [clozetCreate, setClozetCreate] = useState("");
  const history = useHistory();
  const menuRef = useRef();

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
  // --------------------- logout All---------------------------------------
  const handleLogoutAll = async () => {
    try {
      const token = await localStorage.getItem("token");

      await api.post(
        "/users/logoutAll",
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
  const handleMenu = (e) => {
    if (e.type === "mouseover") {
      setMenu("profile-menu");
      setTriangle(<span>&#9654;</span>);
    }
    if (e.type === "mouseout") {
      setMenu("hide");
      setTriangle(<span>&#9660;</span>);
    }
  };
  // ---------------------------------------------------------------------
  const handleClozet = () => {
    setClozet("show");
    setMenu("hide");
    setPersons("hide");
    setClozetCreate("hide");
    menuRef.current.blur();
  };
  // ---------------------------------------------------------------------
  const handlePersons = () => {
    setClozet("hide");
    setPersons("show");
    setMenu("hide");
    menuRef.current.blur();
  };
  // ---------------------------------------------------------------------
  const clozetCreateUpdate = (val) => {
    setClozetCreate(val);
  };
  // ---------------------------------------------------------------------
  return (
    <div>
      <div
        ref={menuRef}
        onMouseOver={handleMenu}
        onMouseOut={handleMenu}
        className={menu}
      >
        <div className="menu-option">My profile</div>
        <div onClick={handlePersons} className="menu-option">
          Persons
        </div>
        <div onClick={handleClozet} className="menu-option">
          clozet
        </div>
        <div onClick={handleLogout} className="menu-option">
          Logout
        </div>
        <div onClick={handleLogoutAll} className="menu-option">
          Logout all
        </div>
      </div>
      <div className="user-navbar">
        <div
          onMouseOver={handleMenu}
          onMouseOut={handleMenu}
          className="user-menu-triangle"
        >
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
        {data ? (
          <Clozet
            userName={data ? data.first_name : "owner"}
            clozetCreate={clozetCreate}
            clozetCreateUpdate={clozetCreateUpdate}
          />
        ) : null}
      </div>
      <div className={persons}>
        <Persons userName={data ? data.first_name : "owner"} />
      </div>
    </div>
  );
};

export default User;
