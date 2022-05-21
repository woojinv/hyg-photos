import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";

export default function SignUpPage(props) {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh" }}
      verticalAlign="middle"
    ></Grid>
  );
}
