import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Nav from "react-bootstrap/Nav";

export default function PageHeader({ user, handleLogout }) {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
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

    // <Container>
    //   <Segment
    //     clearing
    //     style={{
    //       maxWidth: 1000,
    //       width: "100%",
    //       margin: "0 auto",
    //       marginTop: "1rem",
    //       display: "flex",
    //       justifyContent: "space-between",
    //     }}
    //   >
    // <Link to="/">
    //   <Image
    //     fluid
    //     src="https://storage.snappages.site/3FFMJ4/assets/images/676092_311x310_500.png"
    //     size="tiny"
    //   ></Image>
    // </Link>

    //     <Header>
    // <Link to="/events">
    //   <Button>Events</Button>
    // </Link>

    //       {user ? (
    //         <>
    //           <Link to="/create">
    //             <Button>Create an Event</Button>
    //           </Link>

    // <Link to="" onClick={handleLogout}>
    //   <Button>Log Out</Button>
    // </Link>
    //         </>
    //       ) : (
    //         <>
    // <Link to="/login">
    //   <Button>Log In</Button>
    // </Link>

    // <Link to="/signup">
    //   <Button>Sign Up</Button>
    // </Link>
    //         </>
    //       )}
    //     </Header>
    //   </Segment>
    // </Container>
  );
}
