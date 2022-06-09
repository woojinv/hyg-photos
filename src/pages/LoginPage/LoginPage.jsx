import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// framer-motion
import { motion } from "framer-motion";

// Components
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";

// CSS
import "./LoginPage.css";

// Semantic UI
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Message,
} from "semantic-ui-react";

// utility functions
import userService from "../../utils/userService";

export default function LoginPage({ user, handleLogout, handleSignUpOrLogin }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await userService.login(state);
      handleSignUpOrLogin();
      setLoading(false);
      navigate("/events");
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) {
    return (
      <>
        <PageHeader user={user} handleLogout={handleLogout} />
        <ErrorMessage error={error} />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader user={user} handleLogout={handleLogout} />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Grid
        centered
        style={{
          height: "100vh",
        }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <motion.div
            style={{ paddingBottom: "15px" }}
            initial={{ scale: 0, x: 500, y: -500 }}
            animate={{ scale: 1, x: 0, y: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            <Header as="h2" color="teal" textAlign="center">
              <Link to="/">
                <img
                  style={{ width: "75px" }}
                  src="https://storage.snappages.site/3FFMJ4/assets/images/676092_311x310_500.png"
                />
              </Link>{" "}
              Log-in to your account
            </Header>
          </motion.div>

          <motion.div
            initial={{ scale: 0, x: 500, y: -500 }}
            animate={{ scale: 1, x: 0, y: 0 }}
            transition={{ delay: 0.1, ease: "easeInOut", duration: 0.5 }}
          >
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Segment stacked>
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  label="Password"
                  value={state.password}
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
                  Login
                </Button>
              </Segment>
            </Form>
          </motion.div>
          <motion.div
            style={{ marginTop: "15px" }}
            initial={{ scale: 0, x: 500, y: -500 }}
            animate={{ scale: 1, x: 0, y: 0 }}
            transition={{ delay: 0.2, ease: "easeInOut", duration: 0.5 }}
          >
            <Message style={{ textAlign: "center" }}>
              New to us? <Link to="/signup">Sign Up</Link>
            </Message>
            {error ? <ErrorMessage error={error} /> : null}
          </motion.div>
        </Grid.Column>
      </Grid>
    </>
  );
}
