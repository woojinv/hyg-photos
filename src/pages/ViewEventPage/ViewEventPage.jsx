import React from "react";
import Header from "../../components/Header/Header";

export default function ViewEventPage({ user, handleLogout }) {
  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <h1>This is the View Event Page</h1>;
    </>
  );
}
