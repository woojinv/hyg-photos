import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";

import React, { Component } from "react";

import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Message,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";

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
