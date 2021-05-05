import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// This components redirects unspecified routes to the user profile page as a security measure

const Redirect = () => {
  const history = useHistory();
  useEffect(() => {
    history.push("/me");
  }, [history]);
  return <div></div>;
};

export default Redirect;
