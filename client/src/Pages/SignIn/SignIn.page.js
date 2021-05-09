import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import api from "../../API/api";
import "./SignIn.page.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  // ---------------------- Sign in -----------------------------------------
  const handleSignIn = async () => {
    try {
      const response = await api.post("/users/login", { email, password });
      setRes(response);
      localStorage.setItem("token", response.data.token);
      console.log(res);
      history.push("/me");
    } catch (e) {
      console.log(e);
      setError("login failed");
    }
  };
  // ---------------------------------------------------------------------------
  return (
    <div>
      <div className="login-bg"></div>
      <div className="login-container">
        <div>
          <input
            className="login-email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            placeholder="Email address"
          />
        </div>
        <div>
          <input
            className="login-password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Enter password"
          />
        </div>
        <div className="login-button" onClick={handleSignIn}>
          Sign in
        </div>
        <div className="signup">
          <h4>No account?</h4>
          <h4>
            <Link to="/signup">Create one here</Link>
          </h4>
        </div>
        <div className="login-error">{error}</div>
      </div>
    </div>
  );
};

export default SignIn;
