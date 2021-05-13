import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../API/api";
import "./User.page.css";
import Clozet from "../../Components/Clozet/Clozet.component";
import Persons from "../../Components/Persons/Persons.component";
import EditUserProfile from "../../Components/EditUserProfile/EditUserProfile.component";
import { defaultAvatar } from "../../Assets/data";

const User = () => {
  const [data, setData] = useState();
  const [menu, setMenu] = useState("hide");
  const [clozet, setClozet] = useState("hide");
  const [persons, setPersons] = useState("hide");
  const [traingle, setTriangle] = useState(<span>&#9660;</span>);
  const [clozetCreate, setClozetCreate] = useState("");
  const [pageTitle, setPageTitle] = useState("Home");
  const [userProfileVisibility, setUserProfileVisibility] = useState("hide");
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
    if (e.type === "mouseover" || e.type === "touchstart") {
      setMenu("profile-menu");
      setTriangle(<span>&#9776;</span>);
      // setTriangle(<span>&#9654;</span>);
    }
    if (e.type === "mouseout" || e.type === "touchend") {
      setMenu("hide");
      setTriangle(<span>&#9776;</span>);
      // setTriangle(<span>&#9660;</span>);
    }
  };
  // ---------------------------------------------------------------------
  const handleClozet = () => {
    setClozet("show");
    setMenu("hide");
    setPersons("hide");
    setClozetCreate("hide");
    setPageTitle("Clozet");
    setUserProfileVisibility("hide");
  };
  // ---------------------------------------------------------------------
  const handlePersons = () => {
    setClozet("hide");
    setPersons("show");
    setMenu("hide");
    setPageTitle("Persons");
    setUserProfileVisibility("hide");
  };
  // ---------------------------------------------------------------------
  const clozetCreateUpdate = (val) => {
    setClozetCreate(val);
  };
  // ---------------------------------------------------------------------
  const handleEditProfile = () => {
    console.log(data.first_name);
    setUserProfileVisibility("show");
    setClozet("hide");
    setPersons("hide");
    setMenu("hide");
    setPageTitle("User Profile");
  };
  // ---------------------------------------------------------------------
  return (
    <div>
      <div
        onMouseOver={handleMenu}
        onTouchStart={handleMenu}
        onMouseOut={handleMenu}
        onTouchEnd={handleMenu}
        className={menu}
      >
        <div
          onClick={handleEditProfile}
          onTouchStart={handleEditProfile}
          className="menu-option"
        >
          My profile
        </div>
        <div
          onClick={handlePersons}
          onTouchStart={handlePersons}
          className="menu-option"
        >
          Persons
        </div>
        <div
          onClick={handleClozet}
          onTouchStart={handleClozet}
          className="menu-option"
        >
          clozet
        </div>
        <div
          onClick={handleLogout}
          onTouchStart={handleLogout}
          className="menu-option"
        >
          Logout
        </div>
        <div
          onClick={handleLogoutAll}
          onTouchStart={handleLogoutAll}
          className="menu-option"
        >
          Logout all
        </div>
      </div>
      <div className="user-navbar">
        <div
          onMouseOver={handleMenu}
          onTouchStart={handleMenu}
          onMouseOut={handleMenu}
          onTouchEnd={handleMenu}
          className="user-menu-triangle"
        >
          {traingle}
        </div>

        <div className="user-avatar">
          {data ? (
            <>
              <img
                src={
                  data.avatar
                    ? `data: image/png;base64,${data.avatar}`
                    : `data: image/png;base64,${defaultAvatar}`
                }
                alt="test"
              />
            </>
          ) : null}
        </div>
        <div className="user-display-name">
          {data ? `${data.first_name} ${data.last_name}` : null}
        </div>
        <div className="page-title">{pageTitle}</div>
      </div>
      <div className={userProfileVisibility}>
        <EditUserProfile data={data} />
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
