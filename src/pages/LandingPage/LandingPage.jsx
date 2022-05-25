import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/Header/Header";
import { Grid, Header, Button, Message } from "semantic-ui-react";

export default function LandingPage(props) {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="teal" textAlign="center">
          Hebron Youth Group
        </Header>
        <Message>
          <Link to="/events">Get Started</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
