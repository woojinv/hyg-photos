import React from "react";

// framer-motion
import { motion } from "framer-motion";

// Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

export default function Footer() {
  return (
    <>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Navbar.Brand href="http://hebronem.org/youth" target="_blank">
              Hebron EM - Youth
            </Navbar.Brand>
          </motion.div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Nav.Link
                  href="https://linktr.ee/HebronYouthGroup"
                  target="_blank"
                >
                  Linktree
                </Nav.Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Nav.Link
                  href="https://www.instagram.com/hebron.yg/"
                  target="_blank"
                >
                  Instagram
                </Nav.Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Nav.Link
                  href="https://discord.com/invite/2UAYCCPFW8"
                  target="_blank"
                >
                  Discord
                </Nav.Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Nav.Link href="mailto:hebronacts@gmail.com" target="_blank">
                  Email
                </Nav.Link>
              </motion.div>
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Nav.Link
                href="https://www.linkedin.com/in/woojin-oh/"
                target="_blank"
              >
                Created by Woojin Oh
              </Nav.Link>
            </motion.div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
