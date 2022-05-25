import React from "react";
import { Segment, Header, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { findByLabelText } from "@testing-library/react";

export default function PageHeader({ user, handleLogout }) {
  return (
    <Segment
      clearing
      style={{
        maxWidth: 800,
        width: "100%",
        margin: "0 auto",
        marginTop: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link to="/">
        <Image
          fluid
          src="https://storage.snappages.site/3FFMJ4/assets/images/676092_311x310_500.png"
          size="tiny"
        ></Image>
      </Link>

      <Header>
        <Link to="/events">
          <Button>Events</Button>
        </Link>

        {user ? (
          <>
            <Link to="/create">
              <Button>Create an Event</Button>
            </Link>

            <Link to="" onClick={handleLogout}>
              <Button>Log Out</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>

            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </Header>
    </Segment>
  );
}
