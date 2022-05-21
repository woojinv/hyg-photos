import React, { useState } from "react";
import "./LoginPage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import { Grid, Header, Image } from "semantic-ui-react";

export default function LoginPage(props) {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="https://storage.snappages.site/3FFMJ4/assets/images/676092_311x310_500.png" />
          Log-in to you account
        </Header>
      </Grid.Column>
    </Grid>
  );
}
