import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Components
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

// Semantic UI
import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";

// utility functions
import userService from "../../utils/userService";

export default function SignUpPage(props) {
  const navigate = useNavigate();
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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await userService.signup(state);
      props.handleSignUpOrLogin();
      navigate("/events");
    } catch (err) {
      console.log(
        err.message,
        "<- this is err from handleSubmit on SignupPage"
      );
      setError(err.message);
    }
  }

  if (error) {
    return (
      <>
        <ErrorMessage error={error} />
      </>
    );
  }

  return (
    <Grid centered style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Link to="/">
            <img
              style={{ width: "75px" }}
              src="https://storage.snappages.site/3FFMJ4/assets/images/676092_311x310_500.png"
            />
          </Link>{" "}
          Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="Username"
              label="Username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="Email"
              label="Email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />

            <Button
              color="teal"
              fluid
              size="large"
              type="submit"
              className="btn"
            >
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
