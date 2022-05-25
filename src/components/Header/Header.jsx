import React from "react";
import { Segment, Header, Image, Menu, MenuItem } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PageHeader({ user, handleLogout }) {
  return (
    <Segment clearing>
      <Header floated="left">
        <Menu size="large">
          <Menu.Item>
            <Link to="/">
              <Image
                src="https://storage.snappages.site/3FFMJ4/assets/images/676092_311x310_500.png"
                size="tiny"
              ></Image>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/events">Events</Link>
          </Menu.Item>
          {user ? (
            <Menu.Item>
              <Link to="/create">Create an Event</Link>
            </Menu.Item>
          ) : null}
        </Menu>
      </Header>
      <Header floated="right">
        <Menu size="large">
          {user ? (
            <>
              <Menu.Item>
                <Link to="" onClick={handleLogout}>
                  Log Out
                </Link>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item>
                <Link to="/login">Log In</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/signup">Sign Up</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Header>
    </Segment>
  );
}
