import React from "react";
import { Link } from "react-router-dom";

// framer-motion
import { motion } from "framer-motion";

// Bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function PageHeader({ user, handleLogout }) {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <motion.img
              style={{ width: "75px" }}
              src="https://storage.snappages.site/3FFMJ4/assets/images/676092_311x310_500.png"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            ></motion.img>
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link className="navLink" to="/events">
                  Events
                </Link>
              </motion.div>
            </Nav.Link>

            {user ? (
              <Nav.Link>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link className="navLink" to="/create">
                    Create
                  </Link>
                </motion.div>
              </Nav.Link>
            ) : null}
          </Nav>

          {user ? (
            <Nav>
              <Nav.Link>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link className="navLink" to="" onClick={handleLogout}>
                    Log Out
                  </Link>
                </motion.div>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link className="navLink" to="/login">
                    Log In
                  </Link>
                </motion.div>
              </Nav.Link>

              <Nav.Link>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link className="navLink" to="/signup">
                    Sign Up
                  </Link>
                </motion.div>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
