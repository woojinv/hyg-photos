import React from "react";
import { Segment, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PageHeader({ user, handleLogout }) {
  return (
    <Segment>
      <Header>
        <Link to="/">
          <Image
            src="https://storage.snappages.site/3FFMJ4/assets/images/676092_311x310_500.png"
            size="tiny"
          ></Image>
        </Link>
        <Link to="/events">Events</Link>
        <br />
        {user ? (
          <>
            <Link to="/create">Create an Event</Link>
            <br />
            <Link to="" onClick={handleLogout}>
              Log Out
            </Link>
          </>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </Header>
    </Segment>
  );
}