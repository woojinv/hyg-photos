import React from "react";
import { Link } from "react-router-dom";

// bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

export default function Footer() {
  return (
    <>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="http://hebronem.org/youth" target="_blank">
            Hebron EM - Youth
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="https://linktr.ee/HebronYouthGroup"
                target="_blank"
              >
                Linktree
              </Nav.Link>
              <Nav.Link
                href="https://www.instagram.com/hebron.yg/"
                target="_blank"
              >
                Instagram
              </Nav.Link>
              <Nav.Link
                href="https://discord.com/invite/2UAYCCPFW8"
                target="_blank"
              >
                Discord
              </Nav.Link>
              <Nav.Link href="mailto:hebronacts@gmail.com" target="_blank">
                Email
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <Nav.Link
              href="https://www.linkedin.com/in/woojin-oh/"
              target="_blank"
            >
              Created by Woojin Oh
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
