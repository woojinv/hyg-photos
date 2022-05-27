import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Nav from "react-bootstrap/Nav";

export default function PageHeader({ user, handleLogout }) {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              style={{ width: "75px" }}
              src="https://storage.snappages.site/3FFMJ4/assets/images/676092_311x310_500.png"
            ></img>
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="navLink" to="/events">
                Events
              </Link>
            </Nav.Link>

            {user ? (
              <Nav.Link>
                <Link className="navLink" to="/create">
                  Create
                </Link>
              </Nav.Link>
            ) : null}
          </Nav>

          {user ? (
            <Nav>
              <Nav.Link>
                <Link className="navLink" to="" onClick={handleLogout}>
                  Log Out
                </Link>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link>
                <Link className="navLink" to="/login">
                  Log In
                </Link>
              </Nav.Link>

              <Nav.Link>
                <Link className="navLink" to="/signup">
                  Sign Up
                </Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
