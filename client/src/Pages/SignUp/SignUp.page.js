import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../API/api";
import "./SignUp.page.css";

const SignIn = () => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const history = useHistory();
  // ---------------------- Sign in -----------------------------------------
  const handleSignUp = async () => {
    setMessage("");
    try {
      const response = await api.post("/users", {
        first_name: fname,
        last_name: lname,
        email,
        password,
      });
      setRes(response);
      console.log(res);
      setMessage("account created successfuly");
      setStatus("success");
      await api.post("/users/login", { email, password });
      localStorage.setItem("login", "login");
      const login = await localStorage.getItem("login");
      const response2 = await api.post("/persons", {
        name: fname,
        age_group: "Adult",
      });
      console.log(response2);
      if (login) {
        history.push("/me");
      }
    } catch (e) {
      console.log(e);
      setMessage("account creation failed, check details and try again");
      setStatus("failed");
    }
  };
  // ---------------------------------------------------------------------------
  return (
    <div>
      <div className="signup-bg"></div>
      <div className="signup-container">
        <div>
          <input
            className="signup-email"
            onChange={(e) => setFName(e.target.value)}
            type="text"
            value={fname}
            placeholder="First name"
          />
        </div>
        <div>
          <input
            className="signup-email"
            onChange={(e) => setLName(e.target.value)}
            type="text"
            value={lname}
            placeholder="Last name"
          />
        </div>
        <div>
          <input
            className="signup-email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            placeholder="Email address"
          />
        </div>
        <div>
          <input
            className="signup-password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Password"
          />
        </div>
        <div className="signup-button" onClick={handleSignUp}>
          Create account
        </div>

        <div className={`signup-message ${status}`}>{message}</div>
        <div className="signin-link">
          {status === "success" ? <Link to="/">Sign In</Link> : null}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
